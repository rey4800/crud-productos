package com.tienda.Tienda.service;

import com.tienda.Tienda.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}
