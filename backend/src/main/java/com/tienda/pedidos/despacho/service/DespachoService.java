package com.tienda.pedidos.despacho.service;

import com.tienda.pedidos.despacho.domain.GuiaEnvio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DespachoService {

    @Transactional
    public GuiaEnvio generarGuia(Long pedidoId, String empresaTransporte) {
        return GuiaEnvio.builder()
                .pedidoId(pedidoId)
                .numeroRastreo("TRACK-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .empresaTransporte(empresaTransporte)
                .estadoEnvio("EN_PREPARACION")
                .fechaDespacho(LocalDateTime.now())
                .build();
    }
}
