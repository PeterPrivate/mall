package com.mmall.utils;

import java.util.UUID;

/**
 * Created by guanxy on 2017/10/20.
 */
public class UUIDUtils {
    public static String uuid(){
        return UUID.randomUUID().toString().replace("-","").substring(0,8);
    }
}
