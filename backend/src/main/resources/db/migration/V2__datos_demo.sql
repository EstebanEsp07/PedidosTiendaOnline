-- Insertar datos iniciales de prueba para inventario
INSERT INTO productos_stock (producto_id, stock_disponible, stock_reservado)
VALUES 
    (101, 50, 0),
    (102, 20, 0),
    (103, 100, 0)
ON CONFLICT (producto_id) DO NOTHING;
