package com.mmall.controller;

import com.mmall.common.ReturnResponse;
import com.mmall.entity.User;
import com.mmall.service.IUserService;
import com.mmall.utils.UUIDUtils;
import com.mmall.vo.UserVo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

/**
 * Created by guanxy on 2017/11/2.
 */
@Controller
@RequestMapping("user")     /*门户接口*/
public class UserController {
    @Autowired
    private IUserService userService;

    /**
     * 登录
     *
     * @param session
     * @param username
     * @param password
     * @return
     */
    @RequestMapping("login.do")
    @ResponseBody
    //传入参数
    public ReturnResponse<User> doLogin(HttpSession session, String username, String password) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        User user1 = userService.findUser(user);
        if (user1 == null) {
            return new ReturnResponse(1, "密码错误");
        } else {
            session.setAttribute("user", user1);     //存进域对象
            UserVo userVo = getUserVo(user1);
            return new ReturnResponse(0, userVo);
        }
    }

    /**
     * 注册
     *
     * @param username
     * @param password
     * @param email
     * @param phone
     * @param question
     * @param answer
     * @return
     */
    @RequestMapping("register.do")
    @ResponseBody
    public ReturnResponse<User> doRegister(String username, String password, String email, String phone, String question, String answer) {
        User user = new User();
        User user1 = userService.findUserByUserName(username);  //检查用户是否存在
        if (user1 != null) {
            return new ReturnResponse(0, "用户已存在");
        } else {
            user.setUsername(username);
            user.setPassword(password);
            user.setEmail(email);
            user.setPhone(phone);
            user.setQuestion(question);
            user.setAnswer(answer);
            userService.saveOne(user);
            return new ReturnResponse(0, "校验成功");
        }
    }

    @RequestMapping("check_valid.do")       /*检查用户名是否有效*/
    @ResponseBody
    public ReturnResponse<User> checkValid(String str, String type) {
        if (type.equals("username")) {
            User user = userService.findUserByUserName(str);
            if (user != null) {
                return new ReturnResponse(1, "用户已存在");
            } else {
                return new ReturnResponse(0, "校验成功");
            }
        } else if (type.equals("email")) {
            User user = userService.findUserByEmail(str);
            if (user != null) {
                return new ReturnResponse(1, "用户已存在");
            } else {
                return new ReturnResponse(0, "校验成功");
            }
        } else {
            return new ReturnResponse(3, "type错误");
        }
    }

    @RequestMapping("get_user_info.do")     //获取登录信息
    @ResponseBody
    public ReturnResponse<User> getUserInfo(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return new ReturnResponse(1, "用户未登录，无法获取当前用户信息");
        } else {
            UserVo userVo = getUserVo(user);
            return new ReturnResponse(0, userVo);
        }
    }

    @RequestMapping("forget_get_question.do")       //忘记密码
    @ResponseBody
    public ReturnResponse forgetQuestion(String username) {
        String question = userService.findQuestionByUsername(username);
        if (question != null) {
            ReturnResponse returnResponse = new ReturnResponse();
            returnResponse.setData(question);
            returnResponse.setStatus(0);
            return returnResponse;
        } else {
            return new ReturnResponse(0, "该用户未设置找回密码问题");
        }
    }

    @RequestMapping("forget_check_answer.do")       //提交问题答案
    @ResponseBody
    public ReturnResponse<User> forgetAnswer(HttpSession session, String username, String question, String answer) {
        User user1 = new User();
        user1.setUsername(username);
        user1.setAnswer(answer);
        user1.setQuestion(question);
        User user = userService.submitAnswer(user1);
        String uuid = UUIDUtils.uuid();
        if (user != null) {
            session.setAttribute("Token", uuid);
            ReturnResponse returnResponse = new ReturnResponse();
            returnResponse.setStatus(0);
            returnResponse.setData(uuid);
            return returnResponse;
        } else {
            return new ReturnResponse(1, "问题回答错误");
        }
    }

    @RequestMapping("forget_reset_password.do")     //忘记密码的重设密码
    @ResponseBody
    public ReturnResponse<User> forgetRstPwd(HttpSession session, String username, String passwordNew, String forgetToken) {
        String uuid = (String) session.getAttribute("Token");
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordNew);
        int i = userService.forgetResetPassword(user);
        if (uuid == null) {
            return new ReturnResponse(1, "token已经失效");
        } else {
            if (uuid.equals(forgetToken) && i == 1) {
                return new ReturnResponse<>(0, "修改密码成功");
            } else {
                return new ReturnResponse(1, "修改密码操作失效");
            }
        }
    }

    @RequestMapping("reset_password.do")    //登录状态重置密码
    @ResponseBody
    public ReturnResponse<User> resetPassword(HttpSession session, String passwordOld, String passwordNew) {
        User user = (User) session.getAttribute("user");
        /*创建一个有新密码的user对象*/
        User u=new User(user.getId(),passwordNew);
        /*判断前端输入的用户密码和后台数据库的密码是否一致，再修改密码*/
        if (!passwordOld.equals(user.getPassword())) {
            return new ReturnResponse(0, "旧密码输入错误");
        } else {
            userService.resetPassword(u);
            return new ReturnResponse(1, "修改密码成功");
        }
    }

    @RequestMapping("update_information.do")      //登录状态更新个人信息
    @ResponseBody
    public ReturnResponse<User> resetPassword(HttpSession session, String email, String phone, String question, String answer) {
        User user = (User) session.getAttribute("user");
        User user1 = new User();
        if (user == null) {
            return new ReturnResponse(0, "用户未登录");
        } else {
            user1 = new User(user.getId(), email, phone, question, answer);
            userService.updateInformation(user1);
            return new ReturnResponse(0, "更新个人信息成功");
        }
    }

    @RequestMapping("get_information.do")       /*获取当前登录用户的详细信息，并强制登录*/
    @ResponseBody
    public ReturnResponse<User> getInformation(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return new ReturnResponse(10, "用户无法获取当前信息，status=10，强制登录");
        } else {
            String userName = user.getUsername();
            System.out.println(userName);
            return new ReturnResponse(0, user);
        }
    }

    @RequestMapping("logout.do")    //退出登录
    @ResponseBody
    public ReturnResponse<User> logout(HttpSession session) {
        session.setAttribute("user", null);
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return new ReturnResponse(0, "退出成功");
        } else {
            return new ReturnResponse(1, "服务端异常");
        }
    }

    public UserVo getUserVo(User user) {
        UserVo userVo = new UserVo();
        BeanUtils.copyProperties(user, userVo);
        return userVo;
    }
}
