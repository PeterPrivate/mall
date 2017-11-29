package com.mmall.dao;

import com.mmall.entity.OrderItem;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by guanxy on 2017/11/6.
 */
public interface OrderItemDao {

    List<OrderItem> selectOrderItemByOrderNo(Long orderNo);

    int insertOne(OrderItem orderItem);

    List<OrderItem> getByorderNoUserId(@Param("orderNo") Long orderNo,@Param("userId") Integer userId);
}
