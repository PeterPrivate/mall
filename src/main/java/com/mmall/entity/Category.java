package com.mmall.entity;

import lombok.Data;

import java.util.Date;

/**
 * Created by guanxy on 2017/11/5.
 */
@Data
public class Category {
    private Integer id;
    private Integer parentId;
    private String name;
    private Integer status;
    private Integer sortOrder;
    private Date createTime;
    private Date updateTime;
}
