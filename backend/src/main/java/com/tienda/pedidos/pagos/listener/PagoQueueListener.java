package com.tienda.pedidos.pagos.listener;

import com.tienda.pedidos.pagos.service.PagoService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PagoQueueListener {

    private final PagoService pagoService;

    @RabbitListener(queues = "pagos.procesar.queue")
    public void procesarSolicitudPago(String mensaje) {
        // Procesa solicitudes de cobro enviadas desde el orquestador de Sagas
    }
}
