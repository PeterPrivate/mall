package com.mmall.vo;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by guanxy on 2017/11/6.
 */
@Data
public class OrderProductVo {
    //订单明细
    private List<OrderItemVo> orderItemVoList;
    private String imageHost;
    private BigDecimal productTotalPrice;
}
