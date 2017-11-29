package com.mmall.entity;

import lombok.Data;

import java.util.Date;

/**
 * Created by guanxy on 2017/11/2.
 */
@Data
public class User {
    private Integer id;
    private String username;
    private String password;
    private String email;
    private String phone;
    private String question;
    private String  answer;
    private Integer role;
    private Date createTime;
    private Date updateTime;
    public User() {
    }

    public User(Integer id, String email, String phone, String question, String answer) {
        this.id = id;
        this.email = email;
        this.phone = phone;
        this.question = question;
        this.answer = answer;
    }

    public User(Integer id, String password) {
        this.id = id;
        this.password = password;
    }
}
