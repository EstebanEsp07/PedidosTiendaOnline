package com.tienda.pedidos;

import com.tienda.pedidos.inventario.service.InventarioService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(MockitoExtension.class)
class InventarioReservaTest {

    @InjectMocks
    private InventarioService inventarioService;

    @Test
    void debeReservarStockCorrectamente() {
        boolean reservado = inventarioService.reservarStock(101L, 2);
        assertTrue(reservado);
    }
}
