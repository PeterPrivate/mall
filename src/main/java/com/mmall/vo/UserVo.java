package com.mmall.vo;

import lombok.Data;

import java.util.Date;

/**
 * Created by guanxy on 2017/11/8 0008.
 */
@Data
public class UserVo {
    private Integer id;
    private String username;
    private String password;
    private String email;
    private String phone;
    private Integer role;
    private Date createTime;
    private Date updateTime;
}
