package com.mmall.service;

import com.mmall.common.ReturnResponse;
import com.mmall.entity.Shipping;

/**
 * Created by guanxy on 2017/11/3.
 */
public interface IShippingService {
    /**
     * 添加地址
     */
    ReturnResponse<Shipping> insert(Integer userId,Shipping shipping);

    /**
     * 删除一条地址
     */
    ReturnResponse<Shipping> delete(Integer id);

    /**
     *  更新一条地址
     */
    ReturnResponse<Shipping> update(Shipping shipping);

    /**
     *  通过id查询一条地址
     */
    ReturnResponse<Shipping> selectById(Integer id);

    /**
     *  查找全部
     */
    ReturnResponse selectShipping(Integer pageNum,Integer pageSize,Integer userId);

}
