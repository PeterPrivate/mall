package com.mmall.service.impl;

import com.mmall.dao.UserDao;
import com.mmall.entity.User;
import com.mmall.service.IUserService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by guanxy on 2017/11/2.
 */
@Service
public class UserServiceImpl implements IUserService {
    @Autowired
    private UserDao userDao;

    @Override
    public User findUser(User uer) {
        return userDao.findUser(uer);
    }

    @Override
    public int saveOne(User user) {
        return userDao.saveOne(user);
    }

    @Override
    public User findUserByUserName(@Param("username") String username) {
        return userDao.findUserByUsername(username);
    }

    @Override
    public User findUserByEmail(String email) {
        return userDao.findUserByEmail(email);
    }

    @Override
    public String findQuestionByUsername(String username) {
        return userDao.findQuestionByUserName(username);
    }

    @Override
    public User submitAnswer(User user) {
        return userDao.submitAnswer(user);
    }

    @Override
    public User checkValid(String str, String type) {
        return userDao.checkValid(str, type);
    }

    @Override
    public int forgetResetPassword(User user) {
        return userDao.forgetResetPassword(user);
    }

    @Override
    public int resetPassword(User user) {
        return userDao.resetPassword(user);
    }

    @Override
    public int updateInformation(User user) {
        return userDao.updateInformation(user);
    }
}
