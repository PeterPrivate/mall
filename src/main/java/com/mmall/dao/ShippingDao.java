package com.mmall.dao;

import com.mmall.entity.Shipping;


import java.util.List;

/**
 * Created by guanxy on 2017/11/3.
 */
public interface ShippingDao {
    /**
     * 添加地址
     */
    int insert(Shipping shipping);


    /**
     * 删除一条地址
     */
    int delete(Integer id);

    /**
     *  更新地址
     */
    int update(Shipping shipping);

    /**
     *  通过id查找一条地址
     */
    Shipping selectById(Integer id);

    /**
     *  查找全部
     */
    List<Shipping> selectShipping();

    /**
     *  查找当前用户的全部地址
     */
    List<Shipping> selectShippingById(Integer userId);
}
