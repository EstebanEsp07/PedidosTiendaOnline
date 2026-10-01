package com.tienda.pedidos.metricas;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/metricas")
public class MetricasController {

    @GetMapping("/kpis")
    public ResponseEntity<Map<String, Object>> obtenerKpis() {
        Map<String, Object> kpis = new HashMap<>();
        kpis.put("pedidosCompletados", 120);
        kpis.put("cancelaciones", 5);
        kpis.put("erroresPago", 2);
        kpis.put("tiempoPromedioDespachoHoras", 4.5);
        return ResponseEntity.ok(kpis);
    }
}
