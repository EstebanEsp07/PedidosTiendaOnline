package com.tienda.pedidos.despacho.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "guias_envio")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GuiaEnvio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long pedidoId;

    @Column(nullable = false, unique = true)
    private String numeroRastreo;

    @Column(nullable = false)
    private String empresaTransporte;

    @Column(nullable = false)
    private String estadoEnvio; // EN_PREPARACION, EN_TRANSITO, ENTREGADO

    private LocalDateTime fechaDespacho;
}
