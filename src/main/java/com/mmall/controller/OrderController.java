package com.mmall.controller;

import com.alipay.api.AlipayApiException;
import com.alipay.api.internal.util.AlipaySignature;
import com.alipay.demo.trade.config.Configs;
import com.mmall.common.ReturnResponse;
import com.mmall.entity.User;
import com.mmall.service.IOrderService;
import com.mmall.utils.StatusUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * Created by guanxy on 2017/11/7.
 */
@RestController
@RequestMapping("order")
public class OrderController {

    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    private IOrderService orderService;

    @RequestMapping("create.do")
    @ResponseBody
    public ReturnResponse createOrder(HttpSession session, Integer shippingId){
        User user = (User) session.getAttribute("user");
        if(user==null){
            return new ReturnResponse(10,"用户未登录");
        }
        return orderService.createOrder(user.getId(),shippingId);
    }

    @RequestMapping("get_order_cart_product.do")
    @ResponseBody
    public ReturnResponse selectOrderProduct(HttpSession session){
        User user = (User) session.getAttribute("user");
        if(user==null){
            return new ReturnResponse(10,"用户未登录");
        }
        return orderService.selectOrderProduct(user.getId());
    }

    @RequestMapping("list.do")
    @ResponseBody
    public ReturnResponse selectOrders(@RequestParam(value = "pageNum",defaultValue = "1") Integer pageNum,
                                       @RequestParam(value = "pageSize",defaultValue = "5") Integer pageSize,
                                       HttpSession session){
        User user = (User) session.getAttribute("user");
        return orderService.selectOrdersByUserId(pageNum,pageSize,user.getId());
    }

    @RequestMapping("detail.do")
    @ResponseBody
    public ReturnResponse selectOrderDetail(Long orderNo){
        return orderService.queryDetail(orderNo);
    }


    @RequestMapping("cancel.do")
    @ResponseBody
    public ReturnResponse cancelOrder(Long orderNo,HttpSession session){
        User user = (User) session.getAttribute("user");
        return orderService.cancelOrder(orderNo, user.getId());
    }


    @RequestMapping("pay.do")
    @ResponseBody
    public ReturnResponse pay(HttpSession session, Long orderNo, HttpServletRequest request){
        User user = (User) session.getAttribute("user");
        //String path = request.getSession().getServletContext().getRealPath("upload");
        String path = "";
        return orderService.pay(orderNo,user.getId(), path);

    }

    @RequestMapping("alipay_callback.do")
    @ResponseBody
    public Object alipayCallback(HttpServletRequest request){
        Map<String,String> params = new HashMap<>();

        Map requestParams = request.getParameterMap();
        for(Iterator iter = requestParams.keySet().iterator();iter.hasNext();){
            String name = (String) iter.next();
            String[] values = (String[]) requestParams.get(name);
            String valueStr = "";
            for (int i = 0 ;i<values.length;i++){
                valueStr = (i==values.length-1)?valueStr+values[i]:valueStr+values[i]+",";
            }
            params.put(name,valueStr);
        }
        logger.info("支付宝回调,sign:{},trade_status:{},参数:{}", params.get("sign"),params.get("trade_status"),params.toString());

        //非常重要，验证回调的
        params.remove("sign_type");
        try {
            boolean alipayRSACheckedV2 = AlipaySignature.rsaCheckV2(params, Configs.getAlipayPublicKey(),"utf-8",Configs.getSignType());

            if (!alipayRSACheckedV2){
                return new ReturnResponse(1,"非法请求，请不要恶意请求");
            }
        } catch (AlipayApiException e) {
            logger.error("支付宝验证回调异常",e);
        }

        ReturnResponse returnResponse = orderService.aliCallback(params);
        if(returnResponse.getStatus()==0){
            return StatusUtil.AlipayCallback.RESPONSE_SUCCESS;
        }
        return StatusUtil.AlipayCallback.RESPONSE_FAILED;
    }


    @RequestMapping("query_order_pay_status.do")
    @ResponseBody
    public ReturnResponse<Boolean> queryOrderPayStatus(HttpSession session, Long orderNo){
        User user = (User) session.getAttribute("user");
        ReturnResponse returnResponse = orderService.queryOrderPayStatus(user.getId(),orderNo);
        if(returnResponse.getStatus()==0){
            return new ReturnResponse<>(0,true);
        }
        return new ReturnResponse<>(1,false);
    }

}
