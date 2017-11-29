package com.mmall.common;

import lombok.Data;

/**
 * Created by guanxy on 2017/11/7 0007.
 */
@Data
public class ReturnRichTextImg {
    private String file_path;
    private String msg;
    private boolean success;

    public ReturnRichTextImg(String file_path, String msg, boolean success) {
        this.file_path = file_path;
        this.msg = msg;
        this.success = success;
    }
}

