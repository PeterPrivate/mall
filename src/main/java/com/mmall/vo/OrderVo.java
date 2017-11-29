package com.mmall.vo;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * Created by guanxy on 2017/11/6.
 */
@Data
public class OrderVo{
    private Long orderNo;
    private BigDecimal payment;
    private Integer paymentType;
    private String paymentTypeDesc;
    private Integer postage;
    private Integer status;
    private String statusDesc;
    private Date paymentTime;
    private Date sendTime;
    private Date endTime;
    private Date closeTime;
    private Date createTime;

    //订单明细
    private List<OrderItemVo> orderItemVoList;

    private String imageHost;
    private Integer shippingId;
    private String receiverName;
    private ShippingVo shippingVo;
}
