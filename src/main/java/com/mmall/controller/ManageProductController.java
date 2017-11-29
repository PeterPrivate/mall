package com.mmall.controller;

import com.mmall.common.ReturnPhoto;
import com.mmall.common.ReturnResponse;
import com.mmall.common.ReturnRichTextImg;
import com.mmall.entity.Product;
import com.mmall.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

/**
 * Created by guanxy on 2017/11/3 0003.
 */
@RestController
@RequestMapping("manage/product")
public class ManageProductController {
    @Autowired
    private IProductService service;

    /**
     * 无条件查询商品列表
     *
     * @param page
     * @param size
     * @return
     */
    @ResponseBody
    @RequestMapping("list.do")
    public ReturnResponse getList(@RequestParam(name = "page", defaultValue = "1") Integer page,
                                  @RequestParam(name = "size", defaultValue = "3") Integer size) {
        Product product = new Product();
        ReturnResponse<Product> returnResponse = service.findList(product, page, size);
        return returnResponse;
    }

    /**
     * 查看产品详细
     *
     * @param product
     * @return
     */
    @RequestMapping("detail.do")
    @ResponseBody
    public ReturnResponse selectOneProduct(Product product) {
        ReturnResponse returnResponse = service.selectProductById(product.getId());
        return returnResponse;
    }

    /**
     * 新增/更新产品
     *
     * @param product
     * @return
     */
    @RequestMapping("save.do")
    @Transactional
    public ReturnResponse updateOrSaveProduct(Product product) {
        ReturnResponse returnResponse = new ReturnResponse();
        if (product.getId() != null) {
            int i = service.updateOne(product);
            if (i > 0) {
                returnResponse.setStatus(0);
                returnResponse.setMsg("更新成功");
                return returnResponse;

            }
            returnResponse.setStatus(1);
            returnResponse.setMsg("更新失败");
            return returnResponse;
        } else {
            int i = service.saveOne(product);
            if (i > 0) {
                returnResponse.setStatus(0);
                returnResponse.setMsg("添加成功");
                return returnResponse;
            }
            returnResponse.setStatus(1);
            returnResponse.setMsg("添加失败");
            return returnResponse;
        }
    }


    /**
     * 条件查询
     *
     * @param product
     * @return
     */
    @RequestMapping("search.do")
    @ResponseBody
    public ReturnResponse search(Product product) {
        ReturnResponse<Product> serach = service.search(product);
        return serach;
    }

    @RequestMapping("set_sale_status.do")
    @ResponseBody
    public ReturnResponse setSaleStatus(Product product) {
        ReturnResponse<Product> returnResponse = service.setSaleStatus(product);
        return returnResponse;
    }

    @RequestMapping("upload.do")
    @ResponseBody
    /*图片上传*/
    public ReturnResponse upload(@RequestParam(name = "upload_file", required = false) MultipartFile multipartFile) {
        String fileName = multipartFile.getOriginalFilename();
        //获取文件扩展名
        String fileExtensionName = fileName.substring(fileName.lastIndexOf(".") + 1);
        //生成保存的文件名
        String uploadFileName = UUID.randomUUID().toString() + "." + fileExtensionName;
        String path = "E:/IdeaProject/mmall/src/main/webapp/WEB-INF/upload/" + uploadFileName;
        try {
            multipartFile.transferTo(new File(path));//保存文件
        } catch (IOException e) {
            e.printStackTrace();
        }
        String url = "http://localhost:8080/" + uploadFileName;

        return new ReturnResponse(0, new ReturnPhoto(uploadFileName, url));
    }


    @RequestMapping("richtext_img_upload.do")
    @ResponseBody
    /*富文本上传图片*/
    public ReturnRichTextImg img_upload(@RequestParam(name = "upload_file", required = false) MultipartFile multipartFile) {
        String fileName = multipartFile.getOriginalFilename();
        //获取文件扩展名
        String fileExtensionName = fileName.substring(fileName.lastIndexOf(".") + 1);
        //生成保存的文件名
        String uploadFileName = UUID.randomUUID().toString() + "." + fileExtensionName;
        try {
            multipartFile.transferTo(new File("E:/IdeaProject/mmall/src/main/webapp/WEB-INF/upload/", uploadFileName));//保存文件
        } catch (IOException e) {
            e.printStackTrace();
        }
        String path = "http://localhost:8080/" + uploadFileName;
        return new ReturnRichTextImg(path, "上传成功", true);
    }
}
