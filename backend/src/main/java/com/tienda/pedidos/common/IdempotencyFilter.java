package com.tienda.pedidos.common;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import java.io.IOException;

@Component
public class IdempotencyFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String idempotencyKey = httpRequest.getHeader("X-Idempotency-Key");

        if (idempotencyKey != null && !idempotencyKey.isBlank()) {
            // Lógica para validar/almacenar la clave de idempotencia
        }

        chain.doFilter(request, response);
    }
}
