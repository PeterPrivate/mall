package com.mmall.dao;

import com.mmall.entity.User;

/**
 * Created by guanxy on 2017/11/2.
 */
public interface UserDao{
    /*登录*/
    User findUser(User user);
    /*注册*/
    int saveOne(User user);
    /*检查用户名是否有效*/
    User findUserByUsername(String username);
    /*检查用户名是否有效*/
    User findUserByEmail(String email);
    /*忘记密码*/
    String findQuestionByUserName(String username);
    /*提交问题答案*/
    User submitAnswer(User user);
    /*检查用户名是否有效*/
    User checkValid(String str, String type);
    /*忘记密码的重设密码*/
    int forgetResetPassword(User user);
    /*登录状态重置密码*/
    int resetPassword(User user);
    /*登录状态更新个人信息*/
    int updateInformation(User user);
}
