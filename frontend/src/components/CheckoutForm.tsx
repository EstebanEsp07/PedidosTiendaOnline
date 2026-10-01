import React, { useState } from 'react';
import { Producto, tiendaApi } from '../api/tiendaApi';

interface Props {
  carrito: { producto: Producto; cantidad: number }[];
  onPedidoCreado: (pedidoId: string) => void;
  onVolver: () => void;
}

export const CheckoutForm: React.FC<Props> = ({ carrito, onPedidoCreado, onVolver }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = carrito.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const idempotencyKey = REQ-\-\;

      const pedido = await tiendaApi.crearPedido({
        clienteNombre: nombre,
        clienteEmail: email,
        direccionEnvio: direccion,
        lineas: carrito.map((i) => ({ productoId: i.producto.id, cantidad: i.cantidad })),
        idempotencyKey,
      });

      onPedidoCreado(pedido.id);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al procesar el pedido. Intente nuevamente.');
    } fontally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <button onClick={onVolver} className="text-sm text-indigo-600 hover:underline mb-4 font-medium">
        &larr; Volver al Catálogo
      </button>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">Finalizar Compra</h2>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
          <input
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Juan Pérez"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="juan@ejemplo.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dirección de Entrega</label>
          <textarea
            required
            rows={3}
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Av. Principal 123 y Calle Secundaria, Ciudad"
          />
        </div>

        <div className="border-t pt-4 mt-6">
          <h3 className="font-semibold text-gray-700 mb-2">Resumen del Pedido</h3>
          <div className="space-y-1 mb-4 text-sm text-gray-600">
            {carrito.map((item) => (
              <div key={item.producto.id} className="flex justify-between">
                <span>{item.producto.nombre} x {item.cantidad}</span>
                <span>\</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-2">
            <span>Total a Pagar:</span>
            <span>\</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow transition duration-150 disabled:opacity-50"
        >
          {loading ? 'Procesando Order & Pago...' : 'Confirmar y Pagar'}
        </button>
      </form>
    </div>
  );
};