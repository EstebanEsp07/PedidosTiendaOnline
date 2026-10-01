package com.tienda.pedidos.pagos.controller;

import com.tienda.pedidos.pagos.service.PagoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/pagos/webhook")
@RequiredArgsConstructor
public class WebhookPagoController {

    private final PagoService pagoService;

    @PostMapping
    public ResponseEntity<Void> recibirNotificacionPasarela(@RequestBody Map<String, Object> payload) {
        // Recepción asíncrona de confirmaciones de pago desde la pasarela externa
        return ResponseEntity.ok().build();
    }
}
