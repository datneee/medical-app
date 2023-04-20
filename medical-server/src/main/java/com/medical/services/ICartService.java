package com.medical.services;

import com.medical.entity.Cart;
import com.medical.filters.AddCartParams;

public interface ICartService {
    Cart getCartByUserId(Integer id);

    void addCartItemToCart(AddCartParams params) throws Exception;



    void buyListCartItems(Integer userId, String payment);


    Cart updateCartAmount(Integer amount , Cart cart);



}
