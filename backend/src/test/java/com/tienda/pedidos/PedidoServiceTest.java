package com.tienda.pedidos;

import com.tienda.pedidos.ordenes.domain.EstadoPedido;
import com.tienda.pedidos.ordenes.domain.Pedido;
import com.tienda.pedidos.ordenes.repository.PedidoRepository;
import com.tienda.pedidos.ordenes.service.PedidoService;
import com.tienda.pedidos.ordenes.service.SagaPedidoOrchestrator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PedidoServiceTest {

    @Mock
    private PedidoRepository pedidoRepository;

    @Mock
    private SagaPedidoOrchestrator sagaOrchestrator;

    @InjectMocks
    private PedidoService pedidoService;

    @Test
    void debeCrearPedidoEIniciarSaga() {
        Pedido pedido = Pedido.builder()
                .clienteId("CLI-123")
                .estado(EstadoPedido.PENDIENTE)
                .total(new BigDecimal("150.00"))
                .build();

        when(pedidoRepository.save(any(Pedido.class))).thenReturn(pedido);

        Pedido resultado = pedidoService.crearPedido(pedido);

        assertNotNull(resultado);
        assertEquals("CLI-123", resultado.getClienteId());
        verify(pedidoRepository, times(1)).save(pedido);
        verify(sagaOrchestrator, times(1)).iniciarSaga(pedido);
    }
}
