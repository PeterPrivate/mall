package com.mmall.service;

import com.mmall.common.ReturnResponse;

import java.util.Map;

/**
 * Created by guanxy on 2017/11/6.
 */
public interface IOrderService {

    /**
     * ****************
     *   后台订单
     * ****************
     */

    /**
     *  查询所有订单
     */
    ReturnResponse selectOrders(Integer pageNum,Integer pageSize);

    /**
     *  根据订单编号查找订单
     */
    ReturnResponse selectOrderByOrderNo(Long orderNo);

    /**
     *  查询订单详情
     */
    ReturnResponse queryDetail(Long orderNo);

    /**
     *  订单发货
     */
    ReturnResponse sendOrder(Long orderNo);


    /**
     * ****************
     *   前台订单
     * ****************
     */

    /**
     *  生成一个订单
     */
    ReturnResponse createOrder(Integer userId,Integer shippingId);

    /**
     *  查看订单商品详情
     */
    ReturnResponse selectOrderProduct(Integer userId);

    /**
     *  查看当前用户的全部订单
     */
    ReturnResponse selectOrdersByUserId(Integer pageNum,Integer pageSize,Integer userId);

    /**
     *  查看当前用户的订单详情
     */
    ReturnResponse selectOrderByNoId(Long orderNo,Integer userId);

    /**
     *  取消订单
     */
    ReturnResponse cancelOrder(Long orderNo,Integer userId);


    /**
     **********************
     *   支付
     **********************
     */

    ReturnResponse pay(Long orderNo,Integer userId,String path);


    ReturnResponse aliCallback(Map<String,String> params);

    ReturnResponse queryOrderPayStatus(Integer userId,Long orderNo);
}
