package com.medical.services;

import com.medical.entity.Product;
import com.medical.entity.ProductImage;
import com.medical.forms.CreateProductImageForm;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface IProductImageService {

    List<ProductImage> createProductImages(List<CreateProductImageForm> images , Product productId);

    void deleteByProductId(Integer productId);

    List<ProductImage> createOrUpdateMany(Product product, MultipartFile[] files);
}
