package com.mmall.controller;

import com.mmall.common.ReturnResponse;
import com.mmall.entity.Shipping;
import com.mmall.entity.User;
import com.mmall.service.IShippingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

/**
 * Created by guanxy on 2017/11/3.
 */
@RestController
@RequestMapping("shipping")
public class ShippingController {

    @Autowired
    private IShippingService shippingService;

    @RequestMapping("add.do")
    @ResponseBody
    public ReturnResponse<Shipping> addShipping(Shipping shipping,HttpSession session){
        User user = (User) session.getAttribute("user");
        if(user==null){
            return new ReturnResponse(10,"用户未登录");
        }
        return shippingService.insert(user.getId(),shipping);
    }


    @RequestMapping("del.do")
    @ResponseBody
    public ReturnResponse<Shipping> delShipping(Integer shippingId){
        return shippingService.delete(shippingId);
    }


    @RequestMapping("update.do")
    @ResponseBody
    public ReturnResponse<Shipping> updateShipping(Shipping shipping){
        return shippingService.update(shipping);
    }


    @RequestMapping("select.do")
    @ResponseBody
    public ReturnResponse<Shipping> selectById(Integer shippingId){
        return shippingService.selectById(shippingId);
    }


    @RequestMapping("list.do")
    @ResponseBody
    public ReturnResponse selectShipping(@RequestParam(value = "pageNum",defaultValue = "1") Integer pageNum,
                                         @RequestParam(value = "pageSize",defaultValue = "10") Integer pageSize,
                                         HttpSession session){
        User user = (User) session.getAttribute("user");
        if(user==null){
            return new ReturnResponse(10,"用户未登录");
        }
        return shippingService.selectShipping(pageNum,pageSize,user.getId());
    }

}
