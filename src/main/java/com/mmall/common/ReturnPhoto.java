package com.mmall.common;

import lombok.Data;

/**
 * Created by guanxy on 2017/11/7 0007.
 */
@Data
public class ReturnPhoto {
    private String uri;
    private String url;

    public ReturnPhoto(String uri, String url) {
        this.uri=uri;
        this.url=url;
    }
    //构造函数
    public ReturnPhoto() {
    }
}
