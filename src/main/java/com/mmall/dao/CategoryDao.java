package com.mmall.dao;

import com.mmall.entity.Category;
import java.util.Arrays;
import java.util.List;

/**
 * Created by guanxy on 2017/11/5.
 */
public interface CategoryDao {
    Category findCategoryByCategoryId(Integer id);  /*获取品类子节点*/
    int addCategory(Category category);     /*增加节点*/
    int setCategoryName(Category category);     /*修改品类名字*/
    List<Category> getDeepCategory(Integer parentId);    /*获取当前分类id及递归子节点categoryId*/
}
