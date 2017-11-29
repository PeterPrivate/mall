package com.mmall.utils;

/**
 * Created by guanxy on 2017/11/6.
 */
public enum StatusUtil {
    CANCEL("已取消",0),UNPAY("未付款",10),PAY("已付款",20),SEND("已发货",40),SUCCESS("交易成功",50),CLOSE("交易关闭",60);

    private String value;
    private Integer key;

    private StatusUtil(String value,Integer key){
        this.value = value;
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Integer getKey() {
        return key;
    }

    public void setKey(Integer key) {
        this.key = key;
    }

    public static String getValue(Integer key){
        for(StatusUtil status:StatusUtil.values()){
            if(status.getKey()==key){
                return status.getValue();
            }
        }
        return null;
    }

    public interface AlipayCallback{
        String TRADE_STATUS_WAIT_BUYER_PAY = "WAIT_BUYER_PAY";
        String TRADE_STATUS_TRADE_SUCCESS = "TRADE_SUCCESS";

        String RESPONSE_SUCCESS = "success";
        String RESPONSE_FAILED = "failed";
    }

}
