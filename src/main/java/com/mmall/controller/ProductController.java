package com.mmall.controller;

import com.mmall.common.ReturnResponse;
import com.mmall.entity.Product;
import com.mmall.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created by guanxy on 2017/11/6 0006.
 */
@RestController
@RequestMapping("product")
public class ProductController {

    @Autowired
    private IProductService service;

    /**
     * 动态查询商品列表
     *
     * @param page
     * @param size
     * @param orderBy
     * @return
     */
    @ResponseBody
    @RequestMapping("list.do")
    /*动态查询*/
    public ReturnResponse getList(@RequestParam(name = "pageNum", defaultValue = "1") Integer page,
                                  @RequestParam(name = "pageSize", defaultValue = "2") Integer size,
                                  @RequestParam(name = "orderBy") String orderBy,
                                  @RequestParam(name = "keyword",required = false) String name,
                                  @RequestParam(name = "categoryId",required = false) Integer categoryId) {
        Product product=new Product();
        product.setName(name);
        product.setCategoryId(categoryId);
        ReturnResponse<Product> returnResponse = service.list(product, page, size, orderBy);
        return returnResponse;
    }

    /**
     * 查看商品详情
     * @param productId
     * @return
     */
    @RequestMapping("detail.do")
    @ResponseBody
    public ReturnResponse getdetail(Integer productId){

        return service.selectProductById(productId);
    }
}
