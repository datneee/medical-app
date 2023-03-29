package com.medical.services;

import com.medical.entity.Order;

public interface IOrderService {

    Order getOrderByUserId(Integer userId);

    Order updateOrderAmount(Integer amount , Order order);



}
