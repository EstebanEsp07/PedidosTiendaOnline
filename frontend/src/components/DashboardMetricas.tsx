import React, { useEffect, useState } from 'react';
import { Metricas, tiendaApi } from '../api/tiendaApi';

export const DashboardMetricas: React.FC = () => {
  const [metricas, setMetricas] = useState<Metricas | null>(null);

  useEffect(() => {
    tiendaApi.obtenerMetricas().then(setMetricas).catch(console.error);
  }, []);

  if (!metricas) {
    return <div className="text-center py-10 text-gray-500">Cargando métricas de negocio...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard de Métricas & KPIs</h2>
        <p className="text-gray-500 text-sm">Monitoreo del rendimiento logístico y operativo</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase">Pedidos Completados</p>
          <p className="text-3xl font-extrabold text-green-600 mt-2">{metricas.pedidosCompletados}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase">Cancelaciones</p>
          <p className="text-3xl font-extrabold text-red-500 mt-2">{metricas.pedidosCancelados}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase">Errores de Pago</p>
          <p className="text-3xl font-extrabold text-amber-500 mt-2">{metricas.erroresPago}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase">Tiempo Compra a Despacho</p>
          <p className="text-3xl font-extrabold text-indigo-600 mt-2">
            {metricas.tiempoPromedioDespachoHoras} <span className="text-base font-normal text-gray-500">hrs</span>
          </p>
        </div>
      </div>
    </div>
  );
};