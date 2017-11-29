package com.mmall.service.impl;

import com.mmall.dao.CategoryDao;
import com.mmall.entity.Category;
import com.mmall.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;

/**
 * Created by guanxy on 2017/11/5.
 */
@Service
public class CatgoryServiceImpl implements ICategoryService {
    @Autowired
    private CategoryDao categoryDao;

    @Override
    public Category findCategoryByCategoryId(Integer id) {
        return categoryDao.findCategoryByCategoryId(id);
    }

    @Override
    public int addCategory(Category category) {
        return categoryDao.addCategory(category);
    }

    @Override
    public int setCategoryName(Category category) {
        return categoryDao.setCategoryName(category);
    }

    @Override
    public List<Category> getDeepCategory(Integer parentId) {
        return categoryDao.getDeepCategory(parentId);
    }
}
