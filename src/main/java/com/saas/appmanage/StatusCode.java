package com.saas.appmanage;

/**
 * Created by Administrator on 2017/10/15.
 */
public enum StatusCode {

    SUCCESS(200,"请求成功"),
    FAIL_RES_NOT_FOUND(40107,"用户名不存在"),

    FAIL_REQU_MANY_BORBID(40302,"参数不完整"),
    FAIL_INSERT_RECORD(500100,"插入数据失败"),
    FAIL_SERVER_EXCEPT(50000,"数据库服务器异常，请联系数据库管理员"),
    FAIL_USERNAME_INVALID(40304,"账号必须在6到10位之间"),
    FAIL_TOKEN_INVALID(40303,"没有登录"),
    FAIL_DATA_EXIT(40305,"数据已经存在！"),

    FAIL_SERVER_UNKNOWN_ERROR(50101,"未知异常");
    private int code;
    private String message;

    StatusCode(int code,String message) {
        this.code = code;
        this.message = message;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

}
