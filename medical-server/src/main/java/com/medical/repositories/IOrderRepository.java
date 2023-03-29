package com.medical.repositories;

import com.medical.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrderRepository extends JpaRepository<Order,Integer> {

    Order findOrderByUserId(Integer id);



}
