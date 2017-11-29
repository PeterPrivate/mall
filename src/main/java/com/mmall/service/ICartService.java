package com.mmall.service;

import com.mmall.common.ReturnResponse;
import com.mmall.entity.Cart;

/**
 * Created by guanxy on 2017/11/4 0004.
 */
public interface ICartService {
    ReturnResponse<Cart> findCartList(Integer uesrId);

    ReturnResponse  saveOne(Cart cart);

    ReturnResponse updateOne(Cart cart);

    ReturnResponse updateCheckYes(Cart cart);

    ReturnResponse updateCheckNo(Cart cart);

    ReturnResponse deleteCartProduct(Cart cart,int[] productIds);

    ReturnResponse selectAllYes(Cart cart);

    ReturnResponse selectAllNo(Cart cart);

    ReturnResponse cartCount(Cart cart);
}
