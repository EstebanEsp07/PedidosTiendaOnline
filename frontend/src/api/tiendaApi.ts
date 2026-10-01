import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stockDisponible: number;
  imagenUrl?: string;
}

export interface LineaPedidoInput {
  productoId: string;
  cantidad: number;
}

export interface CrearPedidoRequest {
  clienteNombre: string;
  clienteEmail: string;
  direccionEnvio: string;
  lineas: LineaPedidoInput[];
  idempotencyKey?: string;
}

export interface Pedido {
  id: string;
  clienteNombre: string;
  clienteEmail: string;
  direccionEnvio: string;
  estado: 'PENDIENTE' | 'RESERVADO' | 'PAGADO' | 'EN_PREPARACION' | 'DESPACHADO' | 'CANCELADO';
  total: number;
  codigoSeguimiento?: string;
  fechaCreacion: string;
}

export interface Metricas {
  pedidosCompletados: number;
  pedidosCancelados: number;
  erroresPago: number;
  tiempoPromedioDespachoHoras: number;
}

export const tiendaApi = {
  // Productos
  obtenerProductos: async (): Promise<Producto[]> => {
    const res = await api.get('/productos');
    return res.data;
  },

  // Pedidos
  crearPedido: async (data: CrearPedidoRequest): Promise<Pedido> => {
    const headers = data.idempotencyKey ? { 'X-Idempotency-Key': data.idempotencyKey } : {};
    const res = await api.post('/pedidos', data, { headers });
    return res.data;
  },

  obtenerPedidoPorId: async (id: string): Promise<Pedido> => {
    const res = await api.get(/pedidos/\);
    return res.data;
  },

  // Bodega / Preparación
  obtenerPedidosPendientesBodega: async (): Promise<Pedido[]> => {
    const res = await api.get('/despacho/pendientes');
    return res.data;
  },

  marcarComoPreparado: async (pedidoId: string): Promise<Pedido> => {
    const res = await api.post(/despacho/\/preparar);
    return res.data;
  },

  marcarComoDespachado: async (pedidoId: string, guia: string): Promise<Pedido> => {
    const res = await api.post(/despacho/\/despachar, { guiaEnvio: guia });
    return res.data;
  },

  // Métricas
  obtenerMetricas: async (): Promise<Metricas> => {
    const res = await api.get('/metricas');
    return res.data;
  },
};