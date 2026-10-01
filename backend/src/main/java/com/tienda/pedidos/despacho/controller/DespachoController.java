package com.tienda.pedidos.despacho.controller;

import com.tienda.pedidos.despacho.domain.GuiaEnvio;
import com.tienda.pedidos.despacho.service.DespachoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/despachos")
@RequiredArgsConstructor
public class DespachoController {

    private final DespachoService despachoService;

    @PostMapping("/generar/{pedidoId}")
    public ResponseEntity<GuiaEnvio> generarGuia(@PathVariable Long pedidoId, @RequestParam String transporte) {
        return ResponseEntity.ok(despachoService.generarGuia(pedidoId, transporte));
    }
}
