package com.mmall.service;

import org.springframework.web.multipart.MultipartFile;

/**
 * Created by guanxy on 2017/11/7 0007.
 */
public interface IFileService {
    String upload(MultipartFile multipartFile,String path);
}
