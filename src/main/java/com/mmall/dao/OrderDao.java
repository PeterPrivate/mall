package com.mmall.dao;

import com.mmall.entity.Order;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by guanxy on 2017/11/3.
 */
public interface OrderDao {
    /**
     *  获取全部订单
     */
    List<Order> selectOrders();

    /**
     *  根据订单编号查找订单
     */
    Order selectOrderByOrderNo(Long orderNo);

    /**
     *  更新一条订单状态
     */
    int updateOrderById(Order order);

    /**
     *  生成一个订单
     */
    int insertOne(Order order);

    /**
     *  通过某个用户的全部订单
     */
    List<Order> selectOrdersByUserId(Integer userId);

    /**
     *  通过某个用户查找某个订单
     */
    Order selectOrderByNoId(@Param("orderNo") Long orderNo, @Param("userId") Integer userId);


}
