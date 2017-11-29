package com.mmall.vo;

import lombok.Data;

import java.math.BigDecimal;

/**
 * Created by guanxy on 2017/11/3 0003.
 */
@Data
public class ProductVo {
    private Integer id;
    private Integer categoryId;
    private String name;
    private String subtitle;
    private String mainImage;
    private Integer status;
    private BigDecimal price;
}
