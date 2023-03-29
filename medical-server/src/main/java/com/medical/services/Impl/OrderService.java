package com.medical.services.Impl;


import com.medical.entity.Order;
import com.medical.repositories.IOrderRepository;
import com.medical.services.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService implements IOrderService {

    @Autowired
    private IOrderRepository repository;


    @Override
    public Order getOrderByUserId(Integer userId) {
        return repository.findOrderByUserId(userId);
    }

    @Override
    public Order updateOrderAmount(Integer amount, Order order) {
        order.setAmount(amount);
        repository.save(order);
        return order;
    }


}
