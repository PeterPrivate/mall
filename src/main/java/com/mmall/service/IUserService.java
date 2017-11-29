package com.mmall.service;

import com.mmall.entity.User;
import org.omg.PortableInterceptor.USER_EXCEPTION;

/**
 * Created by guanxy on 2017/11/2.
 */
public interface IUserService {
    User findUser(User uer);
    int saveOne(User user);
    User findUserByUserName(String username);   /*检查用户名是否有效*/
    User findUserByEmail(String email);     /*检查用户名是否有效*/
    String findQuestionByUsername(String username);
    User submitAnswer(User user);
    User checkValid(String str, String type);
    int forgetResetPassword(User user);
    int resetPassword(User user);
    int updateInformation(User user);
}
