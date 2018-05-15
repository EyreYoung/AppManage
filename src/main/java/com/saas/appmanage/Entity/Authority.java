package com.saas.appmanage.Entity;

public class Authority {
    private int auth_id;
    private String app_name;
    private String auth_name;
    private String auth_intro;
    private String rela_service;

    public int getAuth_id() {
        return auth_id;
    }

    public void setAuth_id(int auth_id) {
        this.auth_id = auth_id;
    }

    public String getApp_name() {
        return app_name;
    }

    public void setApp_name(String app_name) {
        this.app_name = app_name;
    }

    public String getAuth_name() {
        return auth_name;
    }

    public void setAuth_name(String auth_name) {
        this.auth_name = auth_name;
    }

    public String getAuth_intro() {
        return auth_intro;
    }

    public void setAuth_intro(String auth_intro) {
        this.auth_intro = auth_intro;
    }

    public String getRela_service() {
        return rela_service;
    }

    public void setRela_service(String rela_service) {
        this.rela_service = rela_service;
    }
}
