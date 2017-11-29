package com.mmall.dao;

import com.mmall.entity.Product;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by guanxy on 2017/11/2 0002.
 */
public interface ProductDao{


    List<Product> findList(@Param("product") Product product,@Param("page") Integer page,@Param("size") Integer size);

    Product selectProductById(Integer productId);

    int updateOne(Product product);


    int saveOne(Product product);

    List<Product> search(Product product);

    int setSaleStatus(Product product);

    List<Product> list(@Param("product")Product product);




}
