package com.tienda.pedidos.ordenes.service;

import com.tienda.pedidos.ordenes.domain.Pedido;
import com.tienda.pedidos.ordenes.repository.PedidoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final SagaPedidoOrchestrator sagaOrchestrator;

    @Transactional
    public Pedido crearPedido(Pedido pedido) {
        Pedido nuevoPedido = pedidoRepository.save(pedido);
        sagaOrchestrator.iniciarSaga(nuevoPedido);
        return nuevoPedido;
    }

    public List<Pedido> obtenerTodos() {
        return pedidoRepository.findAll();
    }
}
