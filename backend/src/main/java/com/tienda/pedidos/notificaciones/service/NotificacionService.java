package com.tienda.pedidos.notificaciones.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class NotificacionService {

    public void enviarCorreo(String destinatario, String asunto, String mensaje) {
        log.info("Enviando correo a {}: {} - {}", destinatario, asunto, mensaje);
    }

    public void enviarWhatsApp(String numeroTelefono, String mensaje) {
        log.info("Enviando WhatsApp a {}: {}", numeroTelefono, mensaje);
    }
}
