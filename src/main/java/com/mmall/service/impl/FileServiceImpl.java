package com.mmall.service.impl;

import com.mmall.service.IFileService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

/**
 * Created by guanxy on 2017/11/7 0007.
 */
public class FileServiceImpl implements IFileService {

    private Logger logger= LoggerFactory.getLogger(FileServiceImpl.class);

    @Override
    public String upload(MultipartFile multipartFile, String path) {
        String fileName =multipartFile.getOriginalFilename();
        //获取文件扩展名
        String fileExtensionName =fileName.substring(fileName.lastIndexOf(".")+1);
        //生成保存的文件名
        String uploadFileName= UUID.randomUUID().toString()+"."+fileExtensionName;
        logger.info("开始上传文件，上传文件的文件名:{},新建文件名:",fileName,path,uploadFileName);

        File fileDir = new File(path);
        if(!fileDir.exists()){
            //赋予可以写的权限
            fileDir.setWritable(true);
            //创建文件夹  mkdirs aa/bb/cc/  aa bb 父类文件夹都会创建
            fileDir.mkdirs();
        }
        File tartgerFile = new File(path,uploadFileName);
        try {
            multipartFile.transferTo(tartgerFile);
            //文件上传成功
        } catch (IOException e) {
            logger.error("文件上传异常");
            return null;
        }
        return tartgerFile.getName();
    }
}
