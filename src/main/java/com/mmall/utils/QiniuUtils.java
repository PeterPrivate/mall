package com.mmall.utils;

import com.qiniu.common.QiniuException;
import com.qiniu.common.Zone;
import com.qiniu.http.Response;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.UploadManager;
import com.qiniu.util.Auth;

/**
 * Created by guanxy on 2017/11/10.
 */
public class QiniuUtils {
    //设置好账号的ACCESS_KEY和SECRET_KEY
    private static String ACCESS_KEY = "eGFntmQtoqFXOa6-lgXcLy7qMbCDIzsO9NrZ38JC";
    private static String SECRET_KEY = "VjNqQhEHnvamWNGkwsy4KrZEqNULzAqv5K115Zkz";
    //要上传的空间
    private static String bucketname = "guanxy";

    private static Auth auth;
    private static UploadManager uploadManager;

    //密钥配置
    static{
        auth = Auth.create(ACCESS_KEY,SECRET_KEY);
        Zone z = Zone.autoZone();
        Configuration c = new Configuration(z);
        uploadManager = new UploadManager(c);
    }

    private static String getUpToken(){
        return auth.uploadToken(bucketname,null,3600,null);
    }

    public static String upload(String filePath) throws QiniuException {
        Response res = uploadManager.put(filePath, null, getUpToken());
        return (String) res.jsonToMap().get("hash");
    }



}
