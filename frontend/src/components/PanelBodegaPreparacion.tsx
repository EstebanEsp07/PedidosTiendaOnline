import React, { useEffect, useState } from 'react';
import { Pedido, tiendaApi } from '../api/tiendaApi';

export const PanelBodegaPreparacion: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(false);
  const [guiaMap, setGuiaMap] = useState<{ [key: string]: string }>({});

  const cargarPedidos = async () => {
    setLoading(true);
    try {
      const data = await tiendaApi.obtenerPedidosPendientesBodega();
      setPedidos(data);
    } catch (err) {
      console.error('Error al cargar pedidos para bodega', err);
    } fontally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPedidos();
  }, []);

  const handlePreparar = async (id: string) => {
    await tiendaApi.marcarComoPreparado(id);
    cargarPedidos();
  };

  const handleDespachar = async (id: string) => {
    const guia = guiaMap[id];
    if (!guia) return alert('Por favor ingrese el número de guía de envío.');
    await tiendaApi.marcarComoDespachado(id, guia);
    cargarPedidos();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Panel de Operaciones de Bodega</h2>
          <p className="text-gray-500 text-sm">Gestión de picking, empaque y despacho de pedidos</p>
        </div>
        <button
          onClick={cargarPedidos}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium"
        >
          {loading ? 'Cargando...' : 'Actualizar Listado'}
        </button>
      </div>

      {pedidos.length === 0 ? (
        <div className="bg-white p-8 text-center text-gray-500 rounded-xl border border-gray-100">
          No hay pedidos pendientes de empaque ni despacho en este momento.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pedidos.map((p) => (
            <div key={p.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs font-semibold bg-gray-100 px-2 py-1 rounded">{p.id}</span>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">{p.estado}</span>
              </div>
              <p className="text-sm font-medium text-gray-800">{p.clienteNombre}</p>
              <p className="text-xs text-gray-500">{p.direccionEnvio}</p>

              <div className="pt-3 border-t flex items-center justify-between gap-2">
                {p.estado === 'PAGADO' && (
                  <button
                    onClick={() => handlePreparar(p.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2 rounded-lg"
                  >
                    Iniciar Preparación / Empaque
                  </button>
                )}

                {p.estado === 'EN_PREPARACION' && (
                  <div className="w-full flex gap-2">
                    <input
                      type="text"
                      placeholder="N° Guía Envío"
                      value={guiaMap[p.id] || ''}
                      onChange={(e) => setGuiaMap({ ...guiaMap, [p.id]: e.target.value })}
                      className="flex-1 border border-gray-300 rounded-lg px-2.5 text-xs"
                    />
                    <button
                      onClick={() => handleDespachar(p.id)}
                      className="bg-green-600 hover:bg-green-700 text-white font-medium text-xs px-4 py-2 rounded-lg"
                    >
                      Despachar
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};