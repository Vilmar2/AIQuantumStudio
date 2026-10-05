import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  RefreshCw, 
  ShieldCheck, 
  Upload, 
  Mail, 
  UserCheck, 
  Search,
  ExternalLink
} from 'lucide-react';
import { PurchaseOrderRecord } from '../../../server';

interface AdminPurchasesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPurchasesModal: React.FC<AdminPurchasesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [orders, setOrders] = useState<PurchaseOrderRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmingOrder, setConfirmingOrder] = useState<PurchaseOrderRecord | null>(null);
  const [activating, setActivating] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/purchase-orders');
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error('Error fetching admin orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchOrders();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirmActivation = async () => {
    if (!confirmingOrder) return;

    try {
      setActivating(true);
      setErrorMessage(null);

      const res = await fetch(`/api/admin/purchase-orders/${confirmingOrder.id}/activate`, {
        method: 'POST',
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al activar la licencia.');
      }

      setSuccessMessage(`¡Acceso activado con éxito para ${confirmingOrder.name}! Email de notificación enviado a ${confirmingOrder.email}.`);
      setConfirmingOrder(null);
      await fetchOrders();
      setTimeout(() => setSuccessMessage(null), 6000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error al activar el acceso.');
    } finally {
      setActivating(false);
    }
  };

  const filteredOrders = orders.filter((o) =>
    o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.payment_method.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#070b12] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl my-auto text-white">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/15 border border-cyan-400/30 text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                PANEL DE ADMINISTRACIÓN
              </span>
              <span className="text-xs font-mono text-emerald-400">
                AI QUANTUM STUDIO
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight flex items-center gap-2.5">
              <span>🛒 SOLICITUDES DE COMPRA</span>
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400 font-mono">
              Verificá que el pago haya ingresado en Personal Pay o Binance y activá el acceso manualmente.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchOrders}
              disabled={loading}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/10 flex items-center gap-1.5 text-xs font-mono"
              title="Refrescar órdenes"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Actualizar</span>
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/10"
              aria-label="Cerrar panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feedback messages */}
        {successMessage && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 font-mono text-xs flex items-center gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Filter bar */}
        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por cliente o email..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div className="text-xs font-mono text-slate-400">
            Total: <span className="font-bold text-white">{filteredOrders.length}</span> órdenes
          </div>
        </div>

        {/* Orders Table (Responsive with mobile cards) */}
        <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10 bg-black/40">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-white/5 border-b border-white/10 text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4 font-bold">CLIENTE</th>
                <th className="py-3.5 px-4 font-bold">EMAIL</th>
                <th className="py-3.5 px-4 font-bold">MÉTODO DE PAGO</th>
                <th className="py-3.5 px-4 font-bold">PRECIO</th>
                <th className="py-3.5 px-4 font-bold">ESTADO</th>
                <th className="py-3.5 px-4 font-bold">FECHA</th>
                <th className="py-3.5 px-4 font-bold text-right">ACCIÓN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-500 font-mono">
                    No hay solicitudes registradas con ese criterio.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const isPending = order.status === 'pending';
                  const isActive = order.status === 'active';

                  return (
                    <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white">
                        {order.name}
                      </td>
                      <td className="py-3.5 px-4 text-cyan-300">
                        {order.email}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] text-slate-200">
                          {order.payment_method === 'Personal Pay' ? '🇦🇷 Personal Pay' : '₿ Binance Pay'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-white">
                        {order.payment_method === 'Personal Pay' ? `$${order.price_ars.toLocaleString('es-AR')}` : `USD ${order.price_usd}`}
                      </td>
                      <td className="py-3.5 px-4">
                        {isPending ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold text-[10px]">
                            <Clock className="w-3 h-3" />
                            PENDIENTE
                          </span>
                        ) : isActive ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-[10px]">
                            <CheckCircle2 className="w-3 h-3" />
                            ACTIVO
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-500/10 border border-red-500/30 text-red-300 text-[10px]">
                            RECHAZADO
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                        {new Date(order.created_at).toLocaleDateString('es-AR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {isPending ? (
                          <button
                            onClick={() => setConfirmingOrder(order)}
                            className="px-3.5 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-[11px] uppercase tracking-wider transition-all shadow-md shadow-cyan-400/20 active:scale-95 cursor-pointer whitespace-nowrap"
                          >
                            ACTIVAR ACCESO
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-500 font-mono">
                            Habilitado
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* MODAL DE CONFIRMACIÓN DE ACTIVACIÓN MANUAL */}
        {confirmingOrder && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
            <div className="relative w-full max-w-md bg-[#090e17] border border-cyan-500/40 rounded-2xl p-6 sm:p-7 shadow-2xl text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-cyan-400/20 border border-cyan-400/40 text-cyan-400 flex items-center justify-center">
                <UserCheck className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-white uppercase tracking-tight">
                  ¿Confirmás que recibiste el pago de este cliente?
                </h3>
                <p className="mt-2 text-xs font-mono text-slate-300 leading-relaxed">
                  Cliente: <strong className="text-white">{confirmingOrder.name}</strong>
                  <br />
                  Email: <strong className="text-cyan-400">{confirmingOrder.email}</strong>
                  <br />
                  Método: <strong className="text-slate-200">{confirmingOrder.payment_method}</strong> ({confirmingOrder.payment_method === 'Personal Pay' ? '$3.300 ARS' : 'USD 2'})
                </p>
                <p className="mt-2 text-[11px] font-mono text-emerald-400">
                  Al confirmar, se activará la licencia de Dividí Mesa y se despachará automáticamente el email con el enlace de acceso al cliente.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setConfirmingOrder(null)}
                  disabled={activating}
                  className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 font-mono text-xs uppercase font-bold transition-colors cursor-pointer"
                >
                  CANCELAR
                </button>

                <button
                  type="button"
                  onClick={handleConfirmActivation}
                  disabled={activating}
                  className="py-3 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs uppercase font-black transition-all shadow-lg shadow-cyan-400/20 active:scale-95 cursor-pointer"
                >
                  {activating ? 'ACTIVANDO...' : 'SÍ, ACTIVAR'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
