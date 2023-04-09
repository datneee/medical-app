package com.medical.repositories;

import com.medical.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface IProductRepository extends JpaRepository<Product , Integer> , JpaSpecificationExecutor<Product> {

    Product findProductById(Integer id);

    List<Product> findByCategoryId(Integer id);
    Product findProductByTitle(String title);

    boolean existsProductByTitle(String title);
}

