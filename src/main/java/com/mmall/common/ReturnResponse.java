package com.mmall.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.io.Serializable;

/**
 * Created by guanxy on 2017/11/3.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class ReturnResponse<T> implements Serializable {
    private Integer status;
    private T data;
    private String msg;

    public ReturnResponse() {
    }

    public ReturnResponse(Integer status, String msg) {
        this.status = status;
        this.msg = msg;
    }

    public ReturnResponse(T data, String msg) {

        this.data = data;
        this.msg = msg;
    }

    public ReturnResponse(Integer status, T data) {

        this.status = status;
        this.data = data;
    }

    public ReturnResponse(Integer status, T data, String msg) {

        this.status = status;
        this.data = data;
        this.msg = msg;
    }

    public ReturnResponse(Integer status) {
        this.status = status;
    }
}

