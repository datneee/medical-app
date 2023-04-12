package com.medical.services;

import com.medical.dto.ProductDTO;
import com.medical.dto.pagination.PaginateDTO;
import com.medical.entity.OrderItem;
import com.medical.entity.Product;
import com.medical.forms.CreateProductForm;
import com.medical.forms.UpdateProductForm;
import com.medical.specifications.GenericSpecification;

import java.util.List;

public interface IProductService{


    public PaginateDTO<Product> getAllProducts(Integer page, Integer perPage, GenericSpecification<Product> specification);

    public List<OrderItem> getListFeatureProduct() ;
    void buyOneItem(Integer userId, Integer productId, Integer amount);

    public Product getById(Integer id);
    public ProductDTO getProductById(Integer id);


    List<Product> getProductByCategoryId(Integer id);

    public Product getProductByTitle(String title);

    Product createProduct(CreateProductForm form);

    void updateProduct(Integer id, UpdateProductForm form);

    void updateProductAmount(Product product , Integer amount);

    void unLockProductStatus(Integer id);

    void lockProductStatus(Integer id);

    boolean existsProductByTitle(String title);

    long getProductCount();
}
