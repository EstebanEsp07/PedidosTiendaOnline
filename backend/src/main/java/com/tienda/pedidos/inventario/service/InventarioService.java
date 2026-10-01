package com.tienda.pedidos.inventario.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class InventarioService {

    @Transactional
    public boolean reservarStock(Long productoId, Integer cantidad) {
        // Lógica para verificar y reservar stock de un producto
        return true;
    }

    @Transactional
    public void liberarStockReservado(Long productoId, Integer cantidad) {
        // Lógica de compensación de Saga para liberar reservas en caso de fallo
    }
}
