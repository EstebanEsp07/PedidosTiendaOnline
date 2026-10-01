-- Tablas principales del sistema de pedidos y soporte de Saga/Idempotencia

CREATE TABLE IF NOT EXISTS idempotency_keys (
    key VARCHAR(255) PRIMARY KEY,
    response_body TEXT NOT NULL,
    status_code INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS outbox_messages (
    id BIGSERIAL PRIMARY KEY,
    aggregate_type VARCHAR(255) NOT NULL,
    aggregate_id VARCHAR(255) NOT NULL,
    event_type VARCHAR(255) NOT NULL,
    payload TEXT NOT NULL,
    processed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pedidos (
    id BIGSERIAL PRIMARY KEY,
    cliente_id VARCHAR(255) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    total NUMERIC(12, 2) NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lineas_pedido (
    id BIGSERIAL PRIMARY KEY,
    pedido_id BIGINT NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
    producto_id BIGINT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario NUMERIC(12, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS productos_stock (
    id BIGSERIAL PRIMARY KEY,
    producto_id BIGINT UNIQUE NOT NULL,
    stock_disponible INT NOT NULL,
    stock_reservado INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS guias_envio (
    id BIGSERIAL PRIMARY KEY,
    pedido_id BIGINT NOT NULL,
    numero_rastreo VARCHAR(100) UNIQUE NOT NULL,
    empresa_transporte VARCHAR(100) NOT NULL,
    estado_envio VARCHAR(50) NOT NULL,
    fecha_despacho TIMESTAMP
);
