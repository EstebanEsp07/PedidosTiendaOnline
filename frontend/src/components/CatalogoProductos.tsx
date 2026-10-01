import React from 'react';
import { Producto } from '../api/tiendaApi';

interface Props {
  productos: Producto[];
  carrito: { producto: Producto; cantidad: number }[];
  onAgregarAlCarrito: (producto: Producto) => void;
  onIrAlCheckout: () => void;
}

export const CatalogoProductos: React.FC<Props> = ({
  productos,
  carrito,
  onAgregarAlCarrito,
  onIrAlCheckout,
}) => {
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Catálogo de Productos</h2>
          <p className="text-gray-500 text-sm">Selecciona los artículos que deseas pedir</p>
        </div>
        <button
          onClick={onIrAlCheckout}
          disabled={carrito.length === 0}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-lg shadow transition duration-150 flex items-center space-x-2"
        >
          <span>Ver Carrito ({totalItems})</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {productos.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between hover:shadow-md transition"
          >
            <div>
              <div className="w-full h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400 font-medium">
                {prod.imagenUrl ? (
                  <img src={prod.imagenUrl} alt={prod.nombre} className="h-full object-cover rounded-lg" />
                ) : (
                  'Sin Imagen'
                )}
              </div>
              <h3 className="font-semibold text-lg text-gray-800">{prod.nombre}</h3>
              <p className="text-gray-500 text-sm mt-1">{prod.descripcion}</p>
            </div>
            <div className="mt-4 pt-3 border-t flex justify-between items-center">
              <span className="text-xl font-bold text-indigo-600">\</span>
              <button
                onClick={() => onAgregarAlCarrito(prod)}
                disabled={prod.stockDisponible <= 0}
                className="bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white text-sm px-3 py-1.5 rounded-md font-medium"
              >
                {prod.stockDisponible > 0 ? 'Agregar' : 'Agotado'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};