package com.tienda.pedidos.pagos.client;

import org.springframework.stereotype.Component;
import java.math.BigDecimal;

@Component
public class PasarelaPagoClient {

    public boolean procesarCobro(String tarjetaToken, BigDecimal monto) {
        // Integración HTTP con API de la pasarela de pagos (e.g. Stripe, PayPal)
        return true;
    }

    public boolean reembolsar(String transaccionId, BigDecimal monto) {
        // Lógica para emitir reembolsos en pasarela externa
        return true;
    }
}
