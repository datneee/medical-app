package com.medical.services.Impl;

import com.medical.base.BasePagination;
import com.medical.constants.IsHotProductEnum;
import com.medical.constants.StatusCodeEnum;
import com.medical.constants.StatusCodeProductEnum;
import com.medical.dto.ProductDTO;
import com.medical.dto.pagination.PaginateDTO;
import com.medical.entity.*;
import com.medical.forms.CreateProductForm;
import com.medical.forms.UpdateProductForm;
import com.medical.repositories.IProductRepository;
import com.medical.services.*;
import com.medical.specifications.GenericSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductService extends BasePagination<Product, IProductRepository> implements IProductService {


    @Autowired
    private IProductRepository repository;

    @Autowired
    private IProductImageService productImageService;
    @Autowired
    private IOrderService orderService;
    @Autowired
    private IOrderItemService orderItemService;
    @Autowired
    private ICategoryService categoryService;

    @Autowired
    private IBrandService brandService;
    @Autowired
    private IUserService userService;
    @Autowired
    private ITicketService ticketService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    public ProductService(IProductRepository iProductRepository){
        super(iProductRepository);
    }


    @Override
    public Product addTicket(Integer productId, Integer ticketId) throws Exception {

        try {
            Product product = this.getById(productId);
            Ticket ticket = ticketService.getTicketById(ticketId);
            product.setTicket(ticket);
            product.setPromotionPrice(product.getOriginalPrice() * ticket.getDiscount() / 100 );
            return product;
        } catch (Exception e) {
            throw new Exception("Invalid information !");
        }
    }

    @Override
    public PaginateDTO<Product> getAllProducts(Integer page, Integer perPage, GenericSpecification<Product> specification) {

        PaginateDTO<Product> products = this.paginate(page, perPage, specification);
        return products;
    }

    @Override
    public List<OrderItem> getListFeatureProduct() {
        return repository.getListFeatureProduct();
    }

    @Override
    public Product getById(Integer id) {
        return repository.findProductById(id);
    }
    @Override
    public void buyOneItem(Integer userId, Integer productId , Integer amount, String payment, String shipAddress) {
        Order order = new Order(userService.findById(userId), 0);
        order.setShipment(payment);
        order.setShipAddress(shipAddress);
        orderService.createOrder(order);
        Product product = this.getById(productId);
        OrderItem orderItem = new OrderItem(amount ,order, product);
        orderItemService.createOrderItems(orderItem);

        this.updateProductAmount(product , product.getAmount() - amount);
    }
    @Override
    public ProductDTO getProductById(Integer id) {
        Product product = repository.findProductById(id);
        ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
        return productDTO;
    }

    @Override
    public List<Product> getListSpecialProduct() {
        return repository.getListSpecialProduct();
    }

    @Override
    public List<Product> getProductByCategoryId(Integer id) {
        return repository.findByCategoryId(id);
    }

    @Override
    public Product getProductByTitle(String title) {
        return repository.findProductByTitle(title);
    }

    @Override
    public Product createProduct(CreateProductForm form) {
        Product product = form.toEntity();
        product.setIsHot(IsHotProductEnum.valueOf(form.getIsHot()));
        product.setStatus(StatusCodeProductEnum.OPENING);
        product.setCategory(categoryService.getCategoryById(form.getCategoryId()));
        product.setBrand(brandService.getBrandById(form.getBrandId()));

        return repository.save(product);
    }

    @Override
    public void updateProduct(Integer id , UpdateProductForm form) {
        Product p = this.getById(id);
        Product product = form.toEntity();
        product.setId(id);
        product.setBrand(p.getBrand());
        product.setCategory(p.getCategory());
        product.setIsHot(IsHotProductEnum.valueOf(form.getIsHot()));
        product.setStatus(StatusCodeProductEnum.valueOf(form.getStatus()));

        //product.setCategory(categoryService.getCategoryById(repository.findProductById(id).getCategory().getId()));
        product.setCreatedDate(p.getCreatedDate());
        repository.save(product);
    }

    @Override
    public void updateProductAmount(Product product, Integer amount) {
        product.setCurrentAmount(amount);
        repository.save(product);
    }


    @Override
    public void unLockProductStatus(Integer id) {
        Product product = repository.findProductById(id);
        if(product.getStatus() == StatusCodeProductEnum.CLOSED)
            product.setStatus(StatusCodeProductEnum.OPENING);
        repository.save(product);
        if(product.getCategory().getStatus() == StatusCodeEnum.NOT_ACTIVE){
            categoryService.unLockCategory(product.getCategory().getId());
            for (Product pro: product.getCategory().getProducts()) {
                if (pro.getId() != product.getId()) {
                    pro.setStatus(StatusCodeProductEnum.CLOSED);
                    repository.save(product);
                }
            }
        }

    }

    @Override
    public void lockProductStatus(Integer id) {
        Product product = repository.findProductById(id);
        if(product.getStatus() == StatusCodeProductEnum.OPENING)
            product.setStatus(StatusCodeProductEnum.CLOSED);
        repository.save(product);


    }

    @Override
    public boolean existsProductByTitle(String title) {
        return repository.existsProductByTitle(title);
    }

    @Override
    public long getProductCount() {
        return repository.count();
    }

    @Override
    @Transactional
    public void deleteProduct(Integer id) {
        productImageService.deleteByProductId(id);
        repository.deleteById(id);
    }


}
