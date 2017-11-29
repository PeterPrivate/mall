package com.mmall.service.impl;

import com.mmall.common.ReturnResponse;
import com.mmall.dao.CartDao;
import com.mmall.dao.ProductDao;
import com.mmall.entity.Cart;
import com.mmall.entity.Product;
import com.mmall.service.ICartService;
import com.mmall.vo.CartProductVo;
import com.mmall.vo.CartProductVoList;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by guanxy on 2017/11/9.
 */
@Service
public class CartServiceImpl implements ICartService {

    @Autowired
    private CartDao cartDao;

    @Autowired
    private ProductDao productDao;

    @Override
    /*查看当前用户的购物车*/
    public ReturnResponse<Cart> findCartList(Integer userId) {
        List<Cart> cartList = cartDao.findCartList(userId);
        List<CartProductVoList> cartProductVoLists = new ArrayList<>();//存放根据userId获取的商品
        /*判断是否全部选中*/
        boolean AllCheck=true;
        for (Cart c:
                cartList) {
            if(c.getChecked()==0){
                AllCheck=false;
                break;
            }
        }
        CartProductVo cartProductVo = getCartProductVo(userId,cartProductVoLists);
        if (cartProductVoLists != null) {
            cartProductVo.setAllChecked(AllCheck);
            cartProductVo.setCartProductVoList(cartProductVoLists);
            return new ReturnResponse(0, cartProductVo);
        } else {
            return  new ReturnResponse(10, "用户未登录,请登录");
        }
    }

    @Override
    /*添加一条购物车信息*/
    public ReturnResponse saveOne(Cart cart) {
        Product product = productDao.selectProductById(cart.getProductId());
        Cart one = cartDao.findOne(cart);
        //判断该商品在购物车中是否已经存在
        if(one==null){
            //不存在就创建一个新的加入购物车
            if (cart.getQuantity() < product.getStock()) {
                int i = cartDao.saveOne(cart);
                if (i > 0) {
                    return findCartList(cart.getUserId());
                } else {
                    return new ReturnResponse(10, "用户未登录，请登录");
                }
            } else {
                CartProductVoList cartProductVoList = getCartProductVoList(cart);
                cartProductVoList.setLimitQuantity("LIMIT_NUM_FAI");
                return new ReturnResponse(0, cartProductVoList);
            }
        }else{
            //存在就累加数量
            cart.setQuantity(cart.getQuantity()+one.getQuantity());
            return  updateOne(cart);
        }
    }

    @Override
    /*修改产品数量*/
    public ReturnResponse updateOne(Cart cart) {
        Product product = productDao.selectProductById(cart.getProductId());
        if (cart.getQuantity() <= product.getStock()) {
            cartDao.updateOne(cart);
            return findCartList(cart.getUserId());//修改成功，返回用户购物车列表
        } else {
                /*修改数量超过产品库存*/
            CartProductVoList cartProductVoList = getCartProductVoList(cart);
            cartProductVoList.setLimitQuantity("LIMIT_NUM_FAI");
            return new ReturnResponse(0, cartProductVoList);
        }
    }

    @Override
    /*修改商品为选中状态*/
    public ReturnResponse updateCheckYes(Cart cart) {
        int i = cartDao.updateCheckYes(cart);
        Cart one = cartDao.findOne(cart);
        return  findCartList(cart.getUserId());
    }

    @Override
    /*修改商品为未选中状态*/
    public ReturnResponse updateCheckNo(Cart cart) {
        cartDao.updateCheckNo(cart);
        Cart one = cartDao.findOne(cart);
        return  findCartList(cart.getUserId());
    }

    @Override
    public ReturnResponse deleteCartProduct(Cart cart,int[] productIds) {
        cartDao.deleteCartProduct(cart,productIds);
        return null;
    }

    @Override
    @Transactional
    /*该用户所有商品为选中状态*/
    public ReturnResponse selectAllYes(Cart cart) {
        cartDao.selectAllYes(cart);
        List<CartProductVoList> cartProductVoLists = new ArrayList<>();//存放根据userId获取的商品
        CartProductVo cartProductVo = getCartProductVo(cart.getUserId(),cartProductVoLists);
        cartProductVo.setAllChecked(true);
        cartProductVo.setCartProductVoList(cartProductVoLists);
        return  new ReturnResponse(0, cartProductVo);
    }

    @Override
    @Transactional
    /*该用所有商品为未选中状态*/
    public ReturnResponse selectAllNo(Cart cart) {
        cartDao.selectAllNo(cart);
        List<CartProductVoList> cartProductVoLists = new ArrayList<>();//存放根据userId获取的商品
        CartProductVo cartProductVo = getCartProductVo(cart.getUserId(),cartProductVoLists);
        cartProductVo.setAllChecked(false);
        cartProductVo.setCartProductVoList(cartProductVoLists);
        return  new ReturnResponse(0, cartProductVo);
    }

    @Override
    /*获取购物车商品信息总条数*/
    public ReturnResponse cartCount(Cart cart) {
        return new ReturnResponse(0,cartDao.cartCount(cart));
    }

    //重新封装要一个输出的对象CartProductVoList
    public CartProductVoList getCartProductVoList(Cart cart) {
        CartProductVoList cartProductVo = new CartProductVoList();
        BeanUtils.copyProperties(cart, cartProductVo);
        Product product = productDao.selectProductById(cart.getProductId());
        cartProductVo.setProductId(cart.getProductId());
        cartProductVo.setProductName((product.getName()));
        cartProductVo.setProductSubtitle(product.getSubtitle());
        cartProductVo.setProductMainImage(product.getMainImage());
        cartProductVo.setProductPrice(product.getPrice());
        cartProductVo.setProductStatus(product.getStatus());
        cartProductVo.setProductChecked(cart.getChecked());
        cartProductVo.setQuantity(cart.getQuantity());
        BigDecimal totalPrice = product.getPrice().multiply(new BigDecimal(cart.getQuantity()));
        cartProductVo.setProductTotalPrice(totalPrice);
        cartProductVo.setProductStock(product.getStock());
        cartProductVo.setLimitQuantity("LIMIT_NUM_SUCCESS");
        return cartProductVo;
    }


    public CartProductVo getCartProductVo(Integer  userId, List<CartProductVoList> cartProductVoLists){
        List<Cart> list = cartDao.findCartList(userId);
        CartProductVo cartProductVo = new CartProductVo();//实例化一个resultResponse需要的DATA   CartProductVo对象
        //重新封装cart的数据到CartProductVoList中
        BigDecimal add=new BigDecimal(0);
        for (Cart c :
                list) {
            CartProductVoList cartProductVoList = getCartProductVoList(c);
            cartProductVoList.setProductMainImage("http://img.happymmall.com/"+cartProductVoList.getProductMainImage());
            cartProductVoLists.add(cartProductVoList);
            if(cartProductVoList.getProductChecked()==1){
                //把每个商品购买的总金额相加
                add = cartProductVo.getCartTotalPrice().add(cartProductVoList.getProductTotalPrice());
            }
            cartProductVo.setCartTotalPrice(add);//添加到CarProductVoList的list中
        }
        return  cartProductVo;
    }
}
