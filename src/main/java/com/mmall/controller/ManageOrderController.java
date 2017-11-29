package com.mmall.controller;

import com.mmall.common.ReturnResponse;
import com.mmall.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by guanxy on 2017/11/7.
 */
@RestController
@RequestMapping("manage/order")
public class ManageOrderController {

    @Autowired
    private IOrderService orderService;

    @RequestMapping("list.do")
    @ResponseBody
    public ReturnResponse selectOrders(@RequestParam(value = "pageNum",defaultValue = "1") Integer pageNum,
                                       @RequestParam(value = "pageSize",defaultValue = "5") Integer pageSize){
        return orderService.selectOrders(pageNum,pageSize);
    }

    @RequestMapping("search.do")
    @ResponseBody
    public ReturnResponse search(Long orderNo){
        return orderService.selectOrderByOrderNo(orderNo);
    }

    @RequestMapping("detail.do")
    @ResponseBody
    public ReturnResponse detail(Long orderNo){
        return orderService.queryDetail(orderNo);
    }

    @RequestMapping("send_goods.do")
    public ReturnResponse sendOrder(Long orderNo){
        return orderService.sendOrder(orderNo);
    }


}
