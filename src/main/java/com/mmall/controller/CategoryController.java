package com.mmall.controller;

import com.mmall.common.ReturnResponse;
import com.mmall.entity.Category;
import com.mmall.entity.User;
import com.mmall.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.w3c.dom.html.HTMLTableCaptionElement;

import javax.servlet.http.HttpSession;
import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;

/**
 * Created by guanxy on 2017/11/6.
 */
@Controller
@RequestMapping("category")
public class CategoryController {
    @Autowired
    private ICategoryService categoryService;

    @RequestMapping("get_category.do")      /*获取品类子节点*/
    @ResponseBody
    public ReturnResponse<Category> getCategory(HttpSession session,Integer categoryId){
        User user = (User) session.getAttribute("user");
        if (categoryId==null){
            categoryId=0;
        }
        Category category = categoryService.findCategoryByCategoryId(categoryId);
        if (user==null){
            return new ReturnResponse(10,"用户未登录，请登录");
        }else if (category==null){
            return new ReturnResponse(1,"未找到该品类");
        }else {
            return new ReturnResponse(0,category);
        }
    }

    @RequestMapping("add_category.do")      /*增加节点*/
    @ResponseBody
    public ReturnResponse<Category> addCategory(Integer parentId,String categoryName){
        Category category = new Category();
        if(parentId==null){
            parentId=0;
        }
        category.setParentId(parentId);
        category.setName(categoryName);
        int i = categoryService.addCategory(category);
        if (i==1){
            return new ReturnResponse(0,"添加品类成功");
        }else {
            return new ReturnResponse(1,"添加品类失败");
        }
    }

    @RequestMapping("set_category_name.do")     /*修改品类名字*/
    @ResponseBody
    public ReturnResponse<Category> setCategoryName(Integer categoryId,String categoryName){
        Category category = new Category();
        category.setName(categoryName);
        category.setId(categoryId);
        int i = categoryService.setCategoryName(category);
        if (i==1){
            return new ReturnResponse(0,"更新品类名字成功");
        }else {
            return new ReturnResponse(1,"更新品类名字失败");
        }
    }

    @RequestMapping("get_deep_category.do")     /*获取当前分类id及递归子节点categoryId*/
    @ResponseBody
    public ReturnResponse<Category> getDeepCategory(Integer categoryId){
        List<Category> list = categoryService.getDeepCategory(categoryId);
        Integer [] id=new Integer[list.size()];
        Integer i=0;
        for (Category a:
                list) {
            id[i]=a.getId();
            i++;
            System.out.println(a.getId());
        }
        if (list==null){
            return new ReturnResponse(1,"无权限");
        }else {
            return new ReturnResponse(0,Arrays.toString(id));
        }
    }
}
