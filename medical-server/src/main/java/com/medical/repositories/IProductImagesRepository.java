package com.medical.repositories;

import com.medical.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductImagesRepository extends JpaRepository<ProductImage , Integer> {
    ProductImage findByImageUrl(String imageUrl);

    void deleteByProductId(Integer productId);
}
