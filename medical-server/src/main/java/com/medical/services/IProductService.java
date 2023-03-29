package com.medical.services;

import com.medical.dto.pagination.PaginateDTO;
import com.medical.entity.Product;
import com.medical.forms.CreateProductForm;
import com.medical.forms.UpdateProductForm;
import com.medical.specifications.GenericSpecification;

public interface IProductService{


    public PaginateDTO<Product> getAllProducts(Integer page, Integer perPage, GenericSpecification<Product> specification);

    public Product getProductById(Integer id);

    public Product getProductByTitle(String title);

    Product createProduct(CreateProductForm form);

    void updateProduct(Integer id, UpdateProductForm form);

    void updateProductAmount(Product product , Integer amount);

    void unLockProductStatus(Integer id);

    void lockProductStatus(Integer id);

    boolean existsProductByTitle(String title);

    long getProductCount();
}
