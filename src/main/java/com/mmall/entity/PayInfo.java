package com.mmall.entity;

import lombok.Data;

import java.util.Date;

/**
 * Created by guanxy on 2017/11/8.
 */
@Data
public class PayInfo {
    private Integer id;

    private Integer userId;

    private Long orderNo;

    private Integer payPlatform;

    private String platformNumber;

    private String platformStatus;

    private Date createTime;

    private Date updateTime;
}
