package com.medical.services;

import com.medical.entity.Cart;
import com.medical.filters.AddCartParams;

public interface ICartService {
    Cart getCartByUserId(Integer id);

    void addCartItemToCart(AddCartParams params) throws Exception;

    void buyCartItem(Integer userId , Integer cartItemId);

    void buyListCartItems(Integer userId);


    Cart updateCartAmount(Integer amount , Cart cart);



}
