package com.mmall.vo;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by guanxy on 2017/11/5 0005.
 */
@Data
public class CartProductVo {
    private List<CartProductVoList> cartProductVoList;
    private Boolean allChecked;
    private BigDecimal cartTotalPrice=new BigDecimal(0);

    public CartProductVo(List<CartProductVoList> cartProductVoList, Boolean allChecked, BigDecimal cartTotalPrice) {
        this.cartProductVoList = cartProductVoList;
        this.allChecked = allChecked;
        this.cartTotalPrice = cartTotalPrice;
    }

    public CartProductVo() {
    }
}
