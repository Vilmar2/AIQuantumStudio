import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export interface PurchaseOrderRecord {
  id: string;
  product: string;
  product_name: string;
  name: string;
  email: string;
  payment_method: 'Personal Pay' | 'Binance Pay';
  price_usd: number;
  price_ars: number;
  status: 'pending' | 'active' | 'rejected';
  created_at: string;
  activated_at?: string;
}

const ORDERS_FILE = '/tmp/ai_quantum_purchase_orders.json';

// Helper: Read orders from disk/memory
function getOrders(): PurchaseOrderRecord[] {
  try {
    if (fs.existsSync(ORDERS_FILE)) {
      const data = fs.readFileSync(ORDERS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading orders from /tmp:', err);
  }
  return [];
}

// Helper: Save orders to disk
function saveOrders(orders: PurchaseOrderRecord[]) {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving orders to /tmp:', err);
  }
}

// Helper: Send email using Resend API
async function sendResendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) {
  console.log(`\n================== [NOTIFICACIÓN RESEND (NETLIFY)] ==================`);
  console.log(`DESTINATARIO: ${to}`);
  console.log(`ASUNTO: ${subject}`);
  console.log(`TEXTO:\n${text}`);
  console.log(`====================================================================\n`);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[RESEND NETLIFY] RESEND_API_KEY no encontrada en process.env. Verificá las variables de entorno en Netlify.');
    return { success: false, warning: 'NO_RESEND_API_KEY' };
  }

  // Lista de remitentes candidatos para máxima compatibilidad con cuentas Resend verificadas y no verificadas
  const fromCandidates = [
    process.env.RESEND_FROM_EMAIL,
    'AI Quantum Studio <onboarding@resend.dev>',
    'onboarding@resend.dev',
    'AI Quantum Studio <ventas@aiquantum.studio>',
  ].filter(Boolean) as string[];

  let lastError: any = null;

  for (const from of fromCandidates) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: [to],
          subject,
          text,
          html:
            html ||
            `<div style="font-family:sans-serif;line-height:1.6;color:#111;padding:16px;">${text.replace(/\n/g, '<br/>')}</div>`,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        console.log(`[RESEND ÉXITO] Correo despachado a ${to} desde "${from}". ID: ${data.id}`);
        return { success: true, id: data.id, from };
      } else {
        console.warn(`[RESEND FALLÓ DESDE "${from}"]:`, res.status, data);
        lastError = data;
      }
    } catch (err: any) {
      console.error(`[RESEND ERROR DESDE "${from}"]:`, err);
      lastError = err.message;
    }
  }

  return { success: false, error: lastError };
}

// Serverless Handler for Netlify
export const handler = async (event: any, _context: any) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // CORS Preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true }),
    };
  }

  const rawPath = event.path || '';
  // Normalize path removing /.netlify/functions/api or /api
  const cleanPath = rawPath
    .replace(/^\/\.netlify\/functions\/api/, '')
    .replace(/^\/api/, '')
    .toLowerCase();

  console.log(`[NETLIFY API] ${event.httpMethod} ${rawPath} -> ${cleanPath}`);

  try {
    // -------------------------------------------------------------
    // POST /purchase-orders (Client registers purchase)
    // -------------------------------------------------------------
    if (event.httpMethod === 'POST' && (cleanPath === '/purchase-orders' || cleanPath === '')) {
      const body = event.body ? JSON.parse(event.body) : {};
      const { name, email, payment_method } = body;

      if (!name || !name.trim()) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'El nombre completo es obligatorio.' }),
        };
      }
      if (!email || !email.trim() || !email.includes('@')) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'El correo electrónico es inválido.' }),
        };
      }

      const method: 'Personal Pay' | 'Binance Pay' =
        payment_method === 'Binance Pay' ? 'Binance Pay' : 'Personal Pay';
      const orderId = `purchase_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
      const now = new Date().toISOString();

      const newOrder: PurchaseOrderRecord = {
        id: orderId,
        product: 'dividi-mesa',
        product_name: 'Dividí Mesa',
        name: name.trim(),
        email: email.trim().toLowerCase(),
        payment_method: method,
        price_usd: 2,
        price_ars: 3300,
        status: 'pending',
        created_at: now,
      };

      // Save order
      const orders = getOrders();
      orders.unshift(newOrder);
      saveOrders(orders);

      // Notificación administrativa a aiquantumstudio@gmail.com
      const priceText = method === 'Personal Pay' ? '$3.300 ARS' : 'USD 2';
      const notificationText = `NUEVA SOLICITUD DE COMPRA — DIVIDÍ MESA

Cliente:
${newOrder.name}

Email:
${newOrder.email}

Producto:
Dividí Mesa

Método de pago:
${newOrder.payment_method}

Precio:
${priceText}

Estado:
PENDIENTE DE VERIFICACIÓN

Fecha:
${new Date(now).toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}
`;

      const adminHtml = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #070b12; color: #f8fafc; border: 1px solid #00e5ff33; border-radius: 16px; padding: 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
  <div style="border-bottom: 1px solid #ffffff15; padding-bottom: 16px; margin-bottom: 20px;">
    <span style="background: rgba(0,229,255,0.15); color: #00e5ff; font-family: monospace; font-size: 11px; padding: 4px 10px; border-radius: 20px; font-weight: bold; letter-spacing: 1px;">AI QUANTUM STUDIO</span>
    <h2 style="color: #ffffff; margin: 12px 0 0 0; font-size: 22px; font-weight: 800;">NUEVA SOLICITUD DE COMPRA — DIVIDÍ MESA</h2>
  </div>

  <table style="width: 100%; border-collapse: collapse; font-family: monospace; font-size: 13px; margin-bottom: 24px;">
    <tr><td style="color: #94a3b8; padding: 6px 0;">Cliente:</td><td style="color: #ffffff; font-weight: bold;">${newOrder.name}</td></tr>
    <tr><td style="color: #94a3b8; padding: 6px 0;">Email:</td><td style="color: #00e5ff; font-weight: bold;">${newOrder.email}</td></tr>
    <tr><td style="color: #94a3b8; padding: 6px 0;">Producto:</td><td style="color: #ffffff;">Dividí Mesa</td></tr>
    <tr><td style="color: #94a3b8; padding: 6px 0;">Método de pago:</td><td style="color: #ffffff;">${newOrder.payment_method}</td></tr>
    <tr><td style="color: #94a3b8; padding: 6px 0;">Precio:</td><td style="color: #ffffff; font-weight: bold;">${priceText}</td></tr>
    <tr><td style="color: #94a3b8; padding: 6px 0;">Estado:</td><td style="color: #f59e0b; font-weight: bold;">PENDIENTE DE VERIFICACIÓN</td></tr>
    <tr><td style="color: #94a3b8; padding: 6px 0;">ID de Orden:</td><td style="color: #64748b;">${newOrder.id}</td></tr>
  </table>

  <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
    <p style="margin: 0; color: #cbd5e1; font-size: 12px; font-family: monospace;">
      Verificá en tu cuenta de ${newOrder.payment_method} que haya ingresado el pago y activá el acceso desde el Panel de Órdenes en la plataforma.
    </p>
  </div>
</div>
`;

      await sendResendEmail({
        to: 'aiquantumstudio@gmail.com',
        subject: 'NUEVA SOLICITUD DE COMPRA — DIVIDÍ MESA',
        text: notificationText,
        html: adminHtml,
      });

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          success: true,
          order: newOrder,
          message: 'Solicitud registrada como PENDIENTE DE VERIFICACIÓN.',
        }),
      };
    }

    // -------------------------------------------------------------
    // GET /admin/purchase-orders (Admin fetches orders)
    // -------------------------------------------------------------
    if (event.httpMethod === 'GET' && cleanPath === '/admin/purchase-orders') {
      const orders = getOrders();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          orders,
        }),
      };
    }

    // -------------------------------------------------------------
    // POST /admin/purchase-orders/:id/activate
    // -------------------------------------------------------------
    if (
      event.httpMethod === 'POST' &&
      cleanPath.startsWith('/admin/purchase-orders/') &&
      cleanPath.endsWith('/activate')
    ) {
      const segments = cleanPath.split('/');
      const orderId = segments[segments.length - 2];

      const orders = getOrders();
      const orderIndex = orders.findIndex((o) => o.id === orderId);

      if (orderIndex === -1) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Orden no encontrada.' }),
        };
      }

      const order = orders[orderIndex];
      order.status = 'active';
      order.activated_at = new Date().toISOString();
      orders[orderIndex] = order;
      saveOrders(orders);

      // Email al cliente
      const customerText = `Hola ${order.name},

¡Tu acceso a Dividí Mesa ya está activo!

Ya podés comenzar a utilizar la aplicación.

[ 🚀 ACCEDER A DIVIDÍ MESA ]
https://dividimesa.netlify.app/

Gracias por confiar en AI Quantum Studio.

AI Quantum Studio
`;

      const customerHtml = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 580px; margin: 0 auto; background: #070b12; color: #f8fafc; border: 1px solid #00e5ff44; border-radius: 20px; padding: 32px; box-shadow: 0 10px 40px rgba(0,0,0,0.6);">
  <div style="text-align: center; margin-bottom: 24px;">
    <span style="background: rgba(0,229,255,0.15); color: #00e5ff; font-family: monospace; font-size: 11px; padding: 4px 12px; border-radius: 20px; font-weight: bold; letter-spacing: 1px;">AI QUANTUM STUDIO</span>
    <h1 style="color: #ffffff; margin: 16px 0 8px 0; font-size: 24px; font-weight: 800;">🎉 ¡Tu acceso a Dividí Mesa ya está activo!</h1>
    <p style="color: #94a3b8; font-size: 14px; margin: 0;">Confirmamos tu pago con éxito.</p>
  </div>

  <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 20px; margin-bottom: 28px; font-family: monospace; font-size: 13px;">
    <p style="margin: 0 0 10px 0; color: #f1f5f9;">Hola <strong style="color: #00e5ff;">${order.name}</strong>,</p>
    <p style="margin: 0; color: #cbd5e1; line-height: 1.6;">
      Tu acceso permanente a <strong>Dividí Mesa</strong> se encuentra completamente habilitado. Ya podés ingresar y comenzar a utilizar la aplicación para dividir tus cuentas al instante.
    </p>
  </div>

  <div style="text-align: center; margin-bottom: 28px;">
    <a href="https://dividimesa.netlify.app/" target="_blank" style="display: inline-block; background: #00e5ff; color: #000000; font-family: monospace; font-weight: 900; font-size: 14px; text-decoration: none; padding: 16px 36px; border-radius: 12px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 6px 20px rgba(0,229,255,0.35);">
      🚀 ACCEDER A DIVIDÍ MESA →
    </a>
  </div>

  <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; text-align: center; color: #64748b; font-size: 12px; font-family: monospace;">
    <p style="margin: 0 0 6px 0;">Gracias por confiar en AI Quantum Studio.</p>
    <p style="margin: 0;">AI Quantum Studio · Soluciones Digitales</p>
  </div>
</div>
`;

      await sendResendEmail({
        to: order.email,
        subject: '🎉 Tu acceso a Dividí Mesa fue activado',
        text: customerText,
        html: customerHtml,
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          order,
          message: 'Acceso activado con éxito y email enviado al cliente.',
        }),
      };
    }

    // Default 404 for unknown API subpaths
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: `Ruta no encontrada: ${cleanPath}` }),
    };
  } catch (err: any) {
    console.error('[NETLIFY API ERROR]', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || 'Error interno del servidor.' }),
    };
  }
};
