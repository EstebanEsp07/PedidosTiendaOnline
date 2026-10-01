package com.tienda.pedidos.inventario.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "productos_stock")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductoStock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long productoId;

    @Column(nullable = false)
    private Integer stockDisponible;

    @Column(nullable = false)
    private Integer stockReservado;
}
