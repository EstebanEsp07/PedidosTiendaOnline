package com.tienda.pedidos;

import com.tienda.pedidos.ordenes.domain.EstadoPedido;
import com.tienda.pedidos.ordenes.domain.Pedido;
import com.tienda.pedidos.ordenes.service.SagaPedidoOrchestrator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

@ExtendWith(MockitoExtension.class)
class SagaCompensacionTest {

    @InjectMocks
    private SagaPedidoOrchestrator sagaOrchestrator;

    @Test
    void debeEjecutarCompensacionSiFallaElPago() {
        Pedido pedido = Pedido.builder()
                .id(1L)
                .estado(EstadoPedido.PENDIENTE)
                .build();

        assertDoesNotThrow(() -> sagaOrchestrator.compensarSaga(pedido, "Fallo en pasarela de pago"));
    }
}
