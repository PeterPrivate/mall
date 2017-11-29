package com.mmall.service;

import com.mmall.common.ReturnResponse;
import com.mmall.entity.Product;
import org.apache.ibatis.annotations.Param;

/**
 * Created by guanxy on 2017/11/2 0002.
 */
public interface IProductService {


    /**
     * @param product
     * @param page
     * @param size
     * @return 初始商品列表
     */
    public ReturnResponse<Product> findList(@Param("product") Product product, @Param("page") Integer page, @Param("size") Integer size);

    /**
     * @param productId
     * @return Product
     */
    public ReturnResponse selectProductById(Integer productId);

    /**
     * 修改
     *
     * @param product
     * @return Product
     */
    public int updateOne(Product product);

    /**
     * 添加
     *
     * @param product
     * @return Product
     */
    public int saveOne(Product product);

    /**
     * 模糊查询
     *
     * @param product
     * @return Product
     */
    public ReturnResponse<Product> search(Product product);

    /**
     * 更改商品的状态
     * @param product
     * @return
     */
    public ReturnResponse<Product> setSaleStatus(Product product);


    /**
     * @param product
     * @param page
     * @param size
     * @return 初始商品列表
     */
    public ReturnResponse<Product> list(Product product, @Param("page") Integer page, @Param("size") Integer size,String orderBy);
}
