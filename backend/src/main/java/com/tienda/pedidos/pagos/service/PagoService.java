package com.tienda.pedidos.pagos.service;

import com.tienda.pedidos.pagos.client.PasarelaPagoClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class PagoService {

    private final PasarelaPagoClient pasarelaPagoClient;

    public boolean ejecutarPago(Long pedidoId, BigDecimal monto, String token) {
        return pasarelaPagoClient.procesarCobro(token, monto);
    }

    public boolean ejecutarReembolso(String transaccionId, BigDecimal monto) {
        return pasarelaPagoClient.reembolsar(transaccionId, monto);
    }
}
