import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory data store for authentication & entitlements
interface UserRecord {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  salt: string;
  createdAt: string;
}

interface EntitlementRecord {
  id: string;
  userId: string;
  productId: string;
  status: 'active' | 'revoked' | 'trial';
  grantedAt: string;
}

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

const users: Map<string, UserRecord> = new Map();
const sessions: Map<string, string> = new Map(); // token -> userId
const entitlements: Map<string, EntitlementRecord[]> = new Map(); // userId -> records
const purchaseOrders: Map<string, PurchaseOrderRecord> = new Map();

// Helper: Email dispatcher (logs clearly in console & supports RESEND_API_KEY if configured)
async function sendNotificationEmail(to: string, subject: string, text: string) {
  console.log(`\n================== [NOTIFICACIÓN POR EMAIL] ==================`);
  console.log(`DESTINATARIO: ${to}`);
  console.log(`ASUNTO: ${subject}`);
  console.log(`--------------------------------------------------------------`);
  console.log(text);
  console.log(`==============================================================\n`);

  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'AI Quantum Studio <ventas@aiquantum.studio>',
          to: [to],
          subject,
          text,
        }),
      });
      console.log(`[RESEND] Notificación enviada. Status: ${res.status}`);
    } catch (err) {
      console.error('[RESEND] Error enviando correo:', err);
    }
  }
}

// Helper: Hash password
function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

// Seed demo users
function initSeedData() {
  // Pre-seed an authorized test user for instant testing
  const salt1 = crypto.randomBytes(16).toString('hex');
  const user1: UserRecord = {
    id: 'usr_premium_01',
    email: 'cliente@aiquantum.studio',
    name: 'Carolina Gómez',
    passwordHash: hashPassword('Quantum2026!', salt1),
    salt: salt1,
    createdAt: new Date().toISOString(),
  };
  users.set(user1.email.toLowerCase(), user1);

  // Give this user access to dividi-mesa
  entitlements.set(user1.id, [
    {
      id: 'ent_01',
      userId: user1.id,
      productId: 'dividi-mesa',
      status: 'active',
      grantedAt: new Date().toISOString(),
    },
  ]);

  // Pre-seed a registered user WITHOUT product license
  const salt2 = crypto.randomBytes(16).toString('hex');
  const user2: UserRecord = {
    id: 'usr_registered_02',
    email: 'visitante@aiquantum.studio',
    name: 'Martín Rossi',
    passwordHash: hashPassword('Quantum2026!', salt2),
    salt: salt2,
    createdAt: new Date().toISOString(),
  };
  users.set(user2.email.toLowerCase(), user2);
  entitlements.set(user2.id, []);
}

initSeedData();

// Products registry
const PRODUCTS = [
  {
    id: 'dividi-mesa',
    name: 'Dividí Mesa',
    type: 'mini-app',
    tagline: 'División inteligente de cuentas, platos y propinas',
    description: 'Herramienta web diseñada para resolver el pago grupal en restaurantes en segundos, plato por plato o en partes iguales, con propina y alias de transferencia.',
    category: 'Gastronomía & Finanzas Prácticas',
    accessUrl: 'https://dividimesa.netlify.app/',
    demoEnabled: true,
    fullAccessProtected: true,
    protectedFeatures: [
      'Exportación automática de comprobante y detalle a WhatsApp',
      'Historial de cierres de mesa y turnos para el restaurante',
      'Integración con alias de cobro dinámico y CBU/CVU',
    ],
  },
  {
    id: 'tip-quantum',
    name: 'Divisor de Propinas & Turnos',
    type: 'mini-app',
    tagline: 'Una Mini App para dividir una cuenta o propinas de equipo al instante',
    description: 'Calcula en segundos el reparto exacto de propinas según horas trabajadas por puesto o divide cuentas entre amigos.',
    category: 'Gastronomía & Utilidades',
    demoEnabled: true,
    fullAccessProtected: true,
    protectedFeatures: ['Exportación instantánea a WhatsApp', 'Ponderación por puesto'],
  },
  {
    id: 'turno-pulse',
    name: 'Turnos para Negocios & Espera',
    type: 'mini-app',
    tagline: 'Gestión ágil de turnos y filas de espera sin descargar aplicaciones',
    description: 'Los clientes escanean un QR o reservan online. Reciben su posición en la fila en tiempo real y una notificación automática por WhatsApp.',
    category: 'Servicios & Locales',
    demoEnabled: true,
    fullAccessProtected: true,
    protectedFeatures: ['Notificaciones push WhatsApp', 'Panel multisede'],
  },
  {
    id: 'margin-quote',
    name: 'Cotizador Express de Márgenes',
    type: 'mini-app',
    tagline: 'Herramienta específica para calcular rentabilidad y precio en segundos',
    description: 'Permite a equipos comerciales generar cotizaciones validadas con costos variables, fijos y escala de descuentos protegidos.',
    category: 'Herramientas para Negocios',
    demoEnabled: true,
    fullAccessProtected: true,
    protectedFeatures: ['Exportación PDF con marca blanca', 'Protección de márgenes'],
  },
  {
    id: 'kitchen-flow',
    name: 'Monitor de Tiempos & Despacho',
    type: 'mini-app',
    tagline: 'Comandero digital táctil para barras y cocinas',
    description: 'Reemplaza tickets de papel perdidos por una pantalla táctil que cronometra tiempos de elaboración y alerta demoras en horas pico.',
    category: 'Operaciones',
    demoEnabled: true,
    fullAccessProtected: true,
    protectedFeatures: ['Sincronización multidispositivo', 'Reportes de tiempos'],
  },
  {
    id: 'dashboard-ventas',
    name: 'Executive Sales & Cashflow',
    type: 'dashboard',
    tagline: 'El pulso de tu facturación, cobranzas y caja en una sola pantalla',
    description: 'Toma información dispersa entre bancos, Mercado Pago y facturación, y la centraliza en un tablero ejecutivo en tiempo real.',
    category: 'Ventas & Tesorería',
    demoEnabled: true,
    fullAccessProtected: true,
    protectedFeatures: ['Conexión bancaria API en vivo', 'Alertas tempranas de quiebre de caja'],
  },
];

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Auth Middleware
  const getAuthUser = (req: Request): UserRecord | null => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    const token = authHeader.split(' ')[1];
    const userId = sessions.get(token);
    if (!userId) return null;
    for (const user of users.values()) {
      if (user.id === userId) return user;
    }
    return null;
  };

  // -------------------------------------------------------------
  // API ROUTES
  // -------------------------------------------------------------

  // GET /api/products
  app.get('/api/products', (_req: Request, res: Response) => {
    res.json({
      success: true,
      products: PRODUCTS,
    });
  });

  // POST /api/auth/direct-access (Entrar directamente sin registro)
  app.post('/api/auth/direct-access', (req: Request, res: Response) => {
    try {
      const name = req.body?.name?.trim() || 'Visitante Quantum';
      const email = req.body?.email?.trim().toLowerCase() || `usuario_${Date.now()}@aiquantum.studio`;

      const directUser: UserRecord = {
        id: `usr_${crypto.randomBytes(6).toString('hex')}`,
        email,
        name,
        passwordHash: '',
        salt: '',
        createdAt: new Date().toISOString(),
      };

      users.set(directUser.id, directUser);

      // Conceder acceso directo a todos los productos y demos
      const allProductIds = PRODUCTS.map((p) => p.id);
      entitlements.set(
        directUser.id,
        allProductIds.map((pid) => ({
          id: `ent_${crypto.randomBytes(4).toString('hex')}`,
          userId: directUser.id,
          productId: pid,
          status: 'active',
          grantedAt: new Date().toISOString(),
        }))
      );

      const token = crypto.randomBytes(32).toString('hex');
      sessions.set(token, directUser.id);

      return res.json({
        success: true,
        token,
        user: {
          id: directUser.id,
          email: directUser.email,
          name: directUser.name,
          createdAt: directUser.createdAt,
        },
        entitlements: allProductIds,
      });
    } catch (err: any) {
      console.error('Direct access error:', err);
      return res.status(500).json({ error: 'Error al ingresar directamente.' });
    }
  });

  // POST /api/auth/register (mantenido por compatibilidad técnica pero sin exigir registro en la interfaz)
  app.post('/api/auth/register', (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body;
      if (!email || !password || !name) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
      }

      if (password.length < 6) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres.' });
      }

      const normalizedEmail = email.trim().toLowerCase();
      if (users.has(normalizedEmail)) {
        return res.status(409).json({ error: 'Ya existe una cuenta con este correo electrónico.' });
      }

      const salt = crypto.randomBytes(16).toString('hex');
      const newUser: UserRecord = {
        id: `usr_${crypto.randomBytes(6).toString('hex')}`,
        email: normalizedEmail,
        name: name.trim(),
        passwordHash: hashPassword(password, salt),
        salt,
        createdAt: new Date().toISOString(),
      };

      users.set(normalizedEmail, newUser);
      entitlements.set(newUser.id, []);

      // Generate session token
      const token = crypto.randomBytes(32).toString('hex');
      sessions.set(token, newUser.id);

      return res.status(201).json({
        success: true,
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          createdAt: newUser.createdAt,
        },
        entitlements: [],
      });
    } catch (err: any) {
      console.error('Register error:', err);
      return res.status(500).json({ error: 'Error interno del servidor al registrarse.' });
    }
  });

  // POST /api/auth/login
  app.post('/api/auth/login', (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña requeridos.' });
      }

      const normalizedEmail = email.trim().toLowerCase();
      const user = users.get(normalizedEmail);
      if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas.' });
      }

      const checkHash = hashPassword(password, user.salt);
      if (checkHash !== user.passwordHash) {
        return res.status(401).json({ error: 'Credenciales inválidas.' });
      }

      const token = crypto.randomBytes(32).toString('hex');
      sessions.set(token, user.id);

      const userEntitlements = entitlements.get(user.id) || [];

      return res.json({
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt,
        },
        entitlements: userEntitlements.map((e) => e.productId),
      });
    } catch (err: any) {
      console.error('Login error:', err);
      return res.status(500).json({ error: 'Error interno del servidor al iniciar sesión.' });
    }
  });

  // GET /api/auth/me
  app.get('/api/auth/me', (req: Request, res: Response) => {
    const user = getAuthUser(req);
    if (!user) {
      return res.status(401).json({ error: 'No autorizado / Sesión no válida' });
    }

    const userEntitlements = entitlements.get(user.id) || [];

    return res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
      entitlements: userEntitlements.map((e) => e.productId),
    });
  });

  // POST /api/auth/logout
  app.post('/api/auth/logout', (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      sessions.delete(token);
    }
    return res.json({ success: true });
  });

  // GET /api/products/:productId/access
  // Server-side entitlement validation
  app.get('/api/products/:productId/access', (req: Request, res: Response) => {
    const { productId } = req.params;
    const product = PRODUCTS.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const user = getAuthUser(req);

    if (!user) {
      // Guest state
      return res.json({
        productId,
        productName: product.name,
        userStatus: 'guest',
        demoEnabled: product.demoEnabled,
        hasFullAccess: false,
        message: 'Visitante: Demo habilitada. Acceso completo requiere inicio de sesión.',
      });
    }

    const userEntitlements = entitlements.get(user.id) || [];
    const hasLicense = userEntitlements.some((e) => e.productId === productId && e.status === 'active');

    return res.json({
      productId,
      productName: product.name,
      userStatus: hasLicense ? 'authorized' : 'registered',
      demoEnabled: product.demoEnabled,
      hasFullAccess: hasLicense,
      message: hasLicense
        ? 'Usuario con producto activado. Acceso completo disponible.'
        : 'Acceso directo disponible. Hacé clic para activar.',
    });
  });

  // POST /api/entitlements/toggle-test-license
  // Allows testing both authorized and unauthorized states seamlessly without payment gateway
  app.post('/api/entitlements/toggle-test-license', (req: Request, res: Response) => {
    const user = getAuthUser(req);
    if (!user) {
      return res.status(401).json({ error: 'Debe iniciar sesión para modificar permisos de prueba.' });
    }

    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ error: 'productId es requerido' });
    }

    const current = entitlements.get(user.id) || [];
    const exists = current.some((e) => e.productId === productId && e.status === 'active');

    let updated: EntitlementRecord[];
    if (exists) {
      updated = current.filter((e) => e.productId !== productId);
    } else {
      updated = [
        ...current,
        {
          id: `ent_${crypto.randomBytes(4).toString('hex')}`,
          userId: user.id,
          productId,
          status: 'active',
          grantedAt: new Date().toISOString(),
        },
      ];
    }

    entitlements.set(user.id, updated);

    return res.json({
      success: true,
      hasAccess: !exists,
      entitlements: updated.map((e) => e.productId),
    });
  });

  // -------------------------------------------------------------
  // PURCHASE & MANUAL ACTIVATION SYSTEM (DIVIDÍ MESA)
  // -------------------------------------------------------------

  // POST /api/purchase-orders (Client submits payment request)
  app.post('/api/purchase-orders', async (req: Request, res: Response) => {
    try {
      const { name, email, payment_method } = req.body;
      if (!name || !name.trim()) {
        return res.status(400).json({ error: 'El nombre completo es obligatorio.' });
      }
      if (!email || !email.trim() || !email.includes('@')) {
        return res.status(400).json({ error: 'El correo electrónico es inválido.' });
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

      purchaseOrders.set(orderId, newOrder);

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

      await sendNotificationEmail(
        'aiquantumstudio@gmail.com',
        'NUEVA SOLICITUD DE COMPRA — DIVIDÍ MESA',
        notificationText
      );

      return res.status(201).json({
        success: true,
        order: newOrder,
        message: 'Solicitud registrada como PENDIENTE DE VERIFICACIÓN.',
      });
    } catch (err: any) {
      console.error('Error creating purchase order:', err);
      return res.status(500).json({ error: 'Error interno al registrar la compra.' });
    }
  });

  // GET /api/admin/purchase-orders (Admin views all purchase orders)
  app.get('/api/admin/purchase-orders', (_req: Request, res: Response) => {
    const list = Array.from(purchaseOrders.values()).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    res.json({
      success: true,
      orders: list,
    });
  });

  // POST /api/admin/purchase-orders/:id/activate (Admin manually activates client access)
  app.post('/api/admin/purchase-orders/:id/activate', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const order = purchaseOrders.get(id);
      if (!order) {
        return res.status(404).json({ error: 'Orden no encontrada.' });
      }

      order.status = 'active';
      order.activated_at = new Date().toISOString();

      // 1. Buscar o registrar al usuario por email
      let user = users.get(order.email);
      if (!user) {
        const salt = crypto.randomBytes(16).toString('hex');
        user = {
          id: `usr_${crypto.randomBytes(6).toString('hex')}`,
          email: order.email,
          name: order.name,
          passwordHash: '',
          salt,
          createdAt: new Date().toISOString(),
        };
        users.set(order.email, user);
      }

      // 2. Asociar y activar la licencia de dividi-mesa
      const currentEntitlements = entitlements.get(user.id) || [];
      const hasDividi = currentEntitlements.some((e) => e.productId === 'dividi-mesa');
      if (!hasDividi) {
        currentEntitlements.push({
          id: `ent_${crypto.randomBytes(4).toString('hex')}`,
          userId: user.id,
          productId: 'dividi-mesa',
          status: 'active',
          grantedAt: new Date().toISOString(),
        });
        entitlements.set(user.id, currentEntitlements);
      } else {
        entitlements.set(
          user.id,
          currentEntitlements.map((e) =>
            e.productId === 'dividi-mesa' ? { ...e, status: 'active' } : e
          )
        );
      }

      // 3. Enviar email de activación al cliente
      const customerEmailText = `Hola ${order.name},

¡Tu acceso a Dividí Mesa ya está activo!

Ya podés comenzar a utilizar la aplicación.

[ 🚀 ACCEDER A DIVIDÍ MESA ]
https://dividimesa.netlify.app/

Gracias por confiar en AI Quantum Studio.

AI Quantum Studio
`;

      await sendNotificationEmail(
        order.email,
        '🎉 Tu acceso a Dividí Mesa fue activado',
        customerEmailText
      );

      return res.json({
        success: true,
        order,
        message: 'Acceso activado con éxito y email enviado al cliente.',
      });
    } catch (err: any) {
      console.error('Error activating purchase order:', err);
      return res.status(500).json({ error: 'Error al activar el acceso.' });
    }
  });

  // POST /api/admin/purchase-orders/:id/reject
  app.post('/api/admin/purchase-orders/:id/reject', (req: Request, res: Response) => {
    const { id } = req.params;
    const order = purchaseOrders.get(id);
    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada.' });
    }
    order.status = 'rejected';
    return res.json({ success: true, order });
  });

  // POST /api/admin/upload-qr (permite actualizar el QR oficial de Personal Pay o Binance)
  app.post('/api/admin/upload-qr', (req: Request, res: Response) => {
    try {
      const { type, dataBase64 } = req.body;
      if (!type || !dataBase64) {
        return res.status(400).json({ error: 'type y dataBase64 son requeridos' });
      }
      const filename = type === 'binance' ? 'qr-binance-pay.png' : 'qr-personal-pay.png';
      const targetPath = path.resolve(__dirname, 'src', 'assets', 'images', filename);
      const base64Data = dataBase64.replace(/^data:image\/\w+;base64,/, '');
      fs.writeFileSync(targetPath, Buffer.from(base64Data, 'base64'));
      return res.json({ success: true, filename });
    } catch (err: any) {
      console.error('Error saving QR image:', err);
      return res.status(500).json({ error: 'Error al guardar la imagen QR.' });
    }
  });

  // -------------------------------------------------------------
  // VITE DEV / STATIC PROD
  // -------------------------------------------------------------
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[AI QUANTUM STUDIO] Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server startup error:', err);
  process.exit(1);
});
