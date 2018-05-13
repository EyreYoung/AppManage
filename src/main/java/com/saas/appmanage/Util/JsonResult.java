package com.saas.appmanage;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.saas.appmanage.StatusCode;

/**
 * Created by Administrator on 2017/10/15.
 */
public class JsonResult {

    // 定义jackson对象
    private static final ObjectMapper MAPPER = new ObjectMapper();

    // 响应状态码,详情见开发手册
    private Integer code;

    // 响应信息
    private String message;

    // 响应中的数据
    private Object data;

    //私有化构造器
    private JsonResult(Integer code, String message, Object data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }


    // 完全构建器
    public static JsonResult build(StatusCode code, Object data) {
        return new JsonResult(code.getCode(), code.getMessage(), data);
    }

    // 无数据构建器
    public static JsonResult build(StatusCode code) {
        return new JsonResult(code.getCode(), code.getMessage(), "");
    }

    //为自定义消息服务的
    public static JsonResult customBuild(String message) {
        if(message == null)
            message = "服务器未知错误";
        return new JsonResult(40045, message, null);
    }


    // 完全ok构建起
    public static JsonResult ok(Object data) {
        return new JsonResult(StatusCode.SUCCESS.getCode(), StatusCode.SUCCESS.getMessage(), data);
    }

    // 无数据构建器
    public static JsonResult ok() {
        return new JsonResult(StatusCode.SUCCESS.getCode(), StatusCode.SUCCESS.getMessage(), null);
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

}
