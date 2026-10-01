import React, { useState } from 'react';
import { CatalogoProductos } from './components/CatalogoProductos';
import { CheckoutForm } from './components/CheckoutForm';
import { RastrearPedido } from './components/RastrearPedido';
import { PanelBodegaPreparacion } from './components/PanelBodegaPreparacion';
import { DashboardMetricas } from './components/DashboardMetricas';
import { Producto } from './api/tiendaApi';

const PRODUCTOS_MOCK: Producto[] = [
  { id: '1', nombre: 'Audífonos Bluetooth Pro', descripcion: 'Cancelación activa de ruido', precio: 89.99, stockDisponible: 15 },
  { id: '2', nombre: 'Teclado Mecánico RGB', descripcion: 'Switches Red silenciosos', precio: 64.50, stockDisponible: 8 },
  { id: '3', nombre: 'Monitor Gaming 27"', descripcion: '165Hz IPS 1ms', precio: 249.00, stockDisponible: 5 },
];

export const App: React.FC = () => {
  const [vista, setVista] = useState<'catalogo' | 'checkout' | 'rastreo' | 'bodega' | 'metricas'>('catalogo');
  const [carrito, setCarrito] = useState<{ producto: Producto; cantidad: number }[]>([]);
  const [ultimoPedidoId, setUltimoPedidoId] = useState<string>('');

  const agregarAlCarrito = (producto: Producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.producto.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.producto.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { producto, cantidad: 1 }];
    });
  };

  const handlePedidoCreado = (id: string) => {
    setUltimoPedidoId(id);
    setCarrito([]);
    setVista('rastreo');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1
            onClick={() => setVista('catalogo')}
            className="text-xl font-bold tracking-tight cursor-pointer text-indigo-400"
          >
            TiendaOnline <span className="text-white text-xs bg-indigo-600 px-2 py-0.5 rounded ml-2">v1.0</span>
          </h1>

          <nav className="flex space-x-1 sm:space-x-2 text-sm">
            <button
              onClick={() => setVista('catalogo')}
              className={px-3 py-1.5 rounded-md transition \}
            >
              Catálogo
            </button>
            <button
              onClick={() => setVista('rastreo')}
              className={px-3 py-1.5 rounded-md transition \}
            >
              Rastrear Pedido
            </button>
            <button
              onClick={() => setVista('bodega')}
              className={px-3 py-1.5 rounded-md transition \}
            >
              Bodega
            </button>
            <button
              onClick={() => setVista('metricas')}
              className={px-3 py-1.5 rounded-md transition \}
            >
              Métricas
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {vista === 'catalogo' && (
          <CatalogoProductos
            productos={PRODUCTOS_MOCK}
            carrito={carrito}
            onAgregarAlCarrito={agregarAlCarrito}
            onIrAlCheckout={() => setVista('checkout')}
          />
        )}

        {vista === 'checkout' && (
          <CheckoutForm
            carrito={carrito}
            onPedidoCreado={handlePedidoCreado}
            onVolver={() => setVista('catalogo')}
          />
        )}

        {vista === 'rastreo' && <RastrearPedido pedidoIdInicial={ultimoPedidoId} />}

        {vista === 'bodega' && <PanelBodegaPreparacion />}

        {vista === 'metricas' && <DashboardMetricas />}
      </main>
    </div>
  );
};

export default App;