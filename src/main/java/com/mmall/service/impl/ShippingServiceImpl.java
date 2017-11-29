package com.mmall.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.mmall.common.ReturnResponse;
import com.mmall.dao.ShippingDao;
import com.mmall.entity.Shipping;
import com.mmall.service.IShippingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by guanxy on 2017/11/3.
 */
@Service
public class ShippingServiceImpl implements IShippingService {
    @Autowired
    private ShippingDao shippingDao;

    @Override
    public ReturnResponse insert(Integer userId,Shipping shipping) {
        //此处userId需从域对象中获取，之后需修改
        shipping.setUserId(userId);
        shippingDao.insert(shipping);
        Map<String,Object> map = new HashMap<>();
        map.put("shipping",shipping.getId());   //将创建成功后添加自动生成的id返回放入map中返回
        ReturnResponse returnResponse = new ReturnResponse(0,map,"新建地址成功");
        return returnResponse;
    }

    @Override
    public ReturnResponse<Shipping> delete(Integer id) {
        shippingDao.delete(id);
        ReturnResponse<Shipping> returnResponse = new ReturnResponse<>(0,"删除地址成功");
        return returnResponse;
    }

    @Override
    public ReturnResponse<Shipping> update(Shipping shipping) {
        shippingDao.update(shipping);
        ReturnResponse<Shipping> returnResponse = new ReturnResponse<>(0,"更新地址成功");
        return returnResponse;
    }

    @Override
    public ReturnResponse<Shipping> selectById(Integer id) {
        Shipping shipping = shippingDao.selectById(id);
        ReturnResponse<Shipping> returnResponse = new ReturnResponse<>(0, shipping);
        return returnResponse;
    }

        @Override
        public ReturnResponse selectShipping(Integer pageNum, Integer pageSize,Integer userId) {
            PageHelper.startPage(pageNum,pageSize);     //分页
            List<Shipping> list = shippingDao.selectShippingById(userId);
            PageInfo pageInfo = new PageInfo(list);
            ReturnResponse returnResponse = new ReturnResponse(0,pageInfo);
            return returnResponse;
        }


}
