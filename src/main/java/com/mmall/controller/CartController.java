package com.mmall.controller;

import com.mmall.common.ReturnResponse;
import com.mmall.entity.Cart;
import com.mmall.entity.User;
import com.mmall.service.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

/**
 * Created by guanxy on 2017/11/4 0004.
 */
@RestController
@RequestMapping("cart")
public class CartController {
    @Autowired
    private ICartService cartService;

    @RequestMapping("list.do")
    @ResponseBody
    /*查询*/
    public ReturnResponse getList( HttpSession session) {
        User user = (User) session.getAttribute("user");
        if(user==null){
            return  new ReturnResponse(10,"用户未登录,请登录");
        }
        return cartService.findCartList(user.getId());
    }
    @RequestMapping("add.do")
    @ResponseBody
    /*添加*/
    public ReturnResponse saveOne(Cart cart, Integer count, HttpSession session) {
        Cart cart1 = setCartUserId(session, cart);
        cart1.setQuantity(count);
        return cartService.saveOne(cart1);
    }

    @RequestMapping("update.do")
    @ResponseBody
    /*修改数量*/
    public ReturnResponse updateOne(Cart cart, Integer count, HttpSession session) {
        Cart cart1 = setCartUserId(session, cart);
        cart1.setQuantity(count);
        return cartService.updateOne(cart1);
    }

    @RequestMapping("select.do")
    @ResponseBody
    /*选择选中状态*/
    public ReturnResponse updateCheck(Cart cart ,HttpSession session) {
        Cart cart1 = setCartUserId(session, cart);
        cart1.setProductId(cart.getProductId());
        return cartService.updateCheckYes(cart1);
    }

    @RequestMapping("un_select.do")
    @ResponseBody
    /*取消选中状态*/
    public ReturnResponse updateCheckNo(Cart cart, HttpSession session) {
        Cart cart1 = setCartUserId(session, cart);
        cart1.setProductId(cart.getProductId());
        return cartService.updateCheckNo(cart1);
    }

    @RequestMapping("delete_product.do")
    @ResponseBody
    /*删除*/
    public ReturnResponse deleteOne(int[] productIds, Cart cart, HttpSession session) {
        Cart cart1 = setCartUserId(session, cart);
        cartService.deleteCartProduct(cart1,productIds);
        return cartService.findCartList(cart1.getUserId());
    }

    @RequestMapping("select_all.do")
    @ResponseBody
    /*全部设置为选中状态*/
    public ReturnResponse selectAllYes( Cart cart, HttpSession session) {
        Cart cart1 = setCartUserId(session, cart);
        return  cartService.selectAllYes(cart1);
    }

    @RequestMapping("un_select_all.do")
    @ResponseBody
    /*全部去掉选中状态*/
    public ReturnResponse selectAllYNo( Cart cart, HttpSession session) {
        Cart cart1 = setCartUserId(session, cart);
        return cartService.selectAllNo(cart1);
    }


    @RequestMapping("get_cart_product_count.do")
    @ResponseBody
    /**/
    public ReturnResponse count(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if(user==null){
            return new ReturnResponse(10,0);
        }
        Cart cart1 = setCartUserId(session, new Cart(user.getId()));
        return cartService.cartCount(cart1);
    }

    public Cart setCartUserId(HttpSession session, Cart cart) {
        User user = (User) session.getAttribute("user");
        cart.setUserId(user.getId());
        return cart;
    }
}
