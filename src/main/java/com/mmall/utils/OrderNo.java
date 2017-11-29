package com.mmall.utils;

import java.util.Date;

/**
 * Created by guanxy on 2017/11/6.
 */
public class OrderNo {
    public static Long ORDER_NO(){
        return new Date().getTime();
    }
}
