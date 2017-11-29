package com.mmall.service;

import com.mmall.entity.Category;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;

/**
 * Created by guanxy on 2017/11/5.
 */
public interface ICategoryService {
    Category findCategoryByCategoryId(Integer id);
    int addCategory(Category category);
    int setCategoryName(Category category);
    List<Category> getDeepCategory(Integer parentId);
}
