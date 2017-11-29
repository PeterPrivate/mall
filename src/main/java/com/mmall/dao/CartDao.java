package com.mmall.dao;

import com.mmall.entity.Cart;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by guanxy on 2017/11/4 0004.
 */
public interface CartDao {

    List<Cart> findCartList(@Param("userId") Integer userId);

    int saveOne(Cart cart);

    int updateOne(Cart cart);

    int updateCheckYes(Cart cart);

    int updateCheckNo(Cart cart);

    int deleteCartProduct(@Param("cart") Cart cart,@Param("productIds") int[] productIds);

    Cart findOne(Cart cart);

    int selectAllYes(Cart cart);

    int selectAllNo(Cart cart);

    int cartCount(@Param("cart") Cart cart);

    List<Cart> selectAllChecked(Integer userId);

    int deleteAfterOrder(Integer userId);
}
