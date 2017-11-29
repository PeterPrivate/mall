package com.mmall.controller;

import com.mmall.common.ReturnResponse;
import com.mmall.entity.User;
import com.mmall.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

/**
 * Created by guanxy on 2017/11/6.
 */
@Controller
@RequestMapping("manage/user")
public class ManageUserController {
    @Autowired
    private IUserService userService;

    @RequestMapping("login.do")     /*后台登录*/
    @ResponseBody
    public ReturnResponse<User> doLogin (HttpSession session, String username, String password){    //传入参数
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        User user1 = userService.findUser(user);
        if(user1==null){
            return new ReturnResponse(1,"密码错误");
        }else {
            session.setAttribute("user",user1);     //存进域对象
            return new ReturnResponse(0,user1.toString());
        }
    }

}
