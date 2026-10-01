import React, { useState } from 'react';
import { Pedido, tiendaApi } from '../api/tiendaApi';

interface Props {
  pedidoIdInicial?: string;
}

export const RastrearPedido: React.FC<Props> = ({ pedidoIdInicial = '' }) => {
  const [pedidoId, setPedidoId] = useState(pedidoIdInicial);
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuscar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pedidoId.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const res = await tiendaApi.obtenerPedidoPorId(pedidoId.trim());
      setPedido(res);
    } catch (err) {
      setError('No se encontró ningún pedido con la clave ingresada.');
      setPedido(null);
    } fontally {
      setLoading(false);
    }
  };

  const getBadgeColor = (estado: Pedido['estado']) => {
    switch (estado) {
      case 'DESPACHADO': return 'bg-green-100 text-green-800';
      case 'EN_PREPARACION': return 'bg-blue-100 text-blue-800';
      case 'PAGADO': return 'bg-purple-100 text-purple-800';
      case 'RESERVADO': return 'bg-yellow-100 text-yellow-800';
      case 'CANCELADO': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Rastrear Estado de Pedido</h2>
        <form onSubmit={handleBuscar} className="flex gap-2">
          <input
            type="text"
            value={pedidoId}
            onChange={(e) => setPedidoId(e.target.value)}
            placeholder="Ingrese Código / ID de Pedido"
            className="flex-1 border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2.5 rounded-lg text-sm transition"
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>
      </div>

      {error && <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm">{error}</div>}

      {pedido && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
          <div className="flex justify-between items-start border-b pb-3">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase">ID de Pedido</p>
              <p className="font-mono font-medium text-gray-800">{pedido.id}</p>
            </div>
            <span className={px-3 py-1 rounded-full text-xs font-semibold \}>
              {pedido.estado}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Cliente</p>
              <p className="font-medium text-gray-800">{pedido.clienteNombre}</p>
            </div>
            <div>
              <p className="text-gray-500">Monto Total</p>
              <p className="font-medium text-gray-800">\</p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-500">Dirección de Despacho</p>
              <p className="font-medium text-gray-800">{pedido.direccionEnvio}</p>
            </div>
            {pedido.codigoSeguimiento && (
              <div className="col-span-2 bg-indigo-50 p-3 rounded-lg text-indigo-900">
                <p className="text-xs font-semibold uppercase">Guía de Rastreos</p>
                <p className="font-mono text-base font-bold">{pedido.codigoSeguimiento}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};