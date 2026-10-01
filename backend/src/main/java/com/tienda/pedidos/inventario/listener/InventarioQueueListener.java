package com.tienda.pedidos.inventario.listener;

import com.tienda.pedidos.inventario.service.InventarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class InventarioQueueListener {

    private final InventarioService inventarioService;

    @RabbitListener(queues = "inventario.reserva.queue")
    public void procesarSolicitudReserva(String mensaje) {
        // Escucha y procesa eventos de solicitud/liberación de inventario
    }
}
