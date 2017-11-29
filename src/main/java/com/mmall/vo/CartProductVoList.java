package com.mmall.vo;

import lombok.Data;

import java.math.BigDecimal;

/**
 * Created by guanxy on 2017/11/4 0004.
 */
@Data
public class CartProductVoList {
    private Integer id;
    private Integer userId;
    private Integer quantity;
    private Integer productId;
    private String productName;
    private String productSubtitle;
    private String productMainImage;
    private BigDecimal productPrice;
    private Integer productStatus;
    private BigDecimal productTotalPrice;
    private Integer productStock;
    private Integer productChecked;
    private String limitQuantity;
}
