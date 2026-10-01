package com.tienda.pedidos.notificaciones.service;

import com.tienda.pedidos.config.RabbitMQConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificacionQueueListener {

    private final NotificacionService notificacionService;

    @RabbitListener(queues = RabbitMQConfig.NOTIFICACIONES_QUEUE)
    public void procesarNotificacion(String mensaje) {
        notificacionService.enviarCorreo("cliente@example.com", "Actualización de Pedido", mensaje);
    }
}
