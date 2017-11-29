package com.mmall.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.mmall.common.ReturnResponse;
import com.mmall.dao.ProductDao;
import com.mmall.entity.Product;
import com.mmall.service.IProductService;
import com.mmall.vo.ProductVo;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by guanxy on 2017/11/2 0002.
 */
@Service
public class ProductServiceImpl implements IProductService {

    @Autowired
    ProductDao productDao;

    @Override
    public ReturnResponse findList(@Param("product") Product product, Integer page, Integer size) {
        PageHelper.startPage(page, size);
        List<Product> list = productDao.findList(product, page, size);

        List<ProductVo> productVoList = new ArrayList();
        /*重新封装对象前必须要先把list放入pageInfo对象中处理，否则会没有上下页*/
        PageInfo pageInfo = new PageInfo(list);

        for (Product p :
                list) {
            ProductVo productVo = getProductVo(p);

            productVoList.add(productVo);//把produc需要的数据重新封装到一个新的对象中添加到List中
        }
        /*把封装过的对象的集合通过pageInfo*/
        pageInfo.setList(productVoList);
        ReturnResponse returnResponse = new ReturnResponse(0, pageInfo);
        return returnResponse;
    }

    @Override
    /*根据productId查询*/
    public ReturnResponse selectProductById(Integer productId) {
        Product product = productDao.selectProductById(productId);
        product.setMainImage("http://img.happymmall.com/"+product.getMainImage());
        ReturnResponse<Product> returnResponse = new ReturnResponse<>(0, product);
        return returnResponse;
    }

    @Override
    /*修改*/
    public int updateOne(Product product) {
        return productDao.updateOne(product);
    }

    @Override
    /*添加*/
    public int saveOne(Product product) {
        return productDao.saveOne(product);
    }

    @Override
    /*查询*/
    public ReturnResponse<Product> search(Product product) {
        List<ProductVo> productVoList = new ArrayList();
        List<Product> search = productDao.search(product);
        for (Product p :
                search) {
            ProductVo productVo = getProductVo(p);
            productVoList.add(productVo);//把produc需要的数据重新封装到一个新的对象中添加到List中
        }
        PageInfo pageInfo = new PageInfo(productVoList);
        ReturnResponse returnResponse = new ReturnResponse(0, pageInfo);
        return returnResponse;
    }

    @Override
    /*修改产品状态*/
    public ReturnResponse<Product> setSaleStatus(Product product) {
        int i = productDao.setSaleStatus(product);
        ReturnResponse rr = new ReturnResponse();
        if (i > 0) {
            rr.setStatus(0);
            rr.setMsg("修改产品状态成功");
            return rr;
        } else {
            rr.setStatus(1);
            rr.setMsg("修改产品状态失败");
            return rr;

        }
    }

    @Override
    @Transactional
    /*动态查询*/
    public ReturnResponse<Product> list(Product product, Integer page, Integer size, String orderBy) {
        if(orderBy.equals("default")){
            PageHelper.startPage(page, size);
        }else{
            String[] split = orderBy.split("_");
            orderBy = split[0] + " " + split[1];
            PageHelper.startPage(page, size, orderBy);
        }

        List<Product> list = productDao.list(product);
        if (list != null) {
            List<ProductVo> productVoList = new ArrayList();
            PageInfo pageInfo = new PageInfo(list);
            for (Product p :
                    list) {
                ProductVo productVo = getProductVo(p);
                productVoList.add(productVo);//把produc需要的数据重新封装到一个新的对象中添加到List中
            }
            pageInfo.setList(productVoList);
            ReturnResponse returnResponse = new ReturnResponse(0, pageInfo);
            return returnResponse;
        } else {
            return new ReturnResponse<>(1, "参数错误");
        }
    }




    /*把Product对象需要的数据重新封装到要ProductVo对象中*/
    public ProductVo getProductVo(Product product) {
        ProductVo productVo = new ProductVo();
        //有的属性直接封装进另一个对象
        BeanUtils.copyProperties(product, productVo);
        productVo.setMainImage("http://img.happymmall.com/"+productVo.getMainImage());
        return productVo;
    }
}
