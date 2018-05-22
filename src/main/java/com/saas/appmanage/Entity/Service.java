package com.saas.appmanage.Entity;

public class Service {
    private int sID;
    private String sName;
    private String sDepen;
    private String sReq;
    private String sIntro;
    private String sVer;
    private double sPrice;
    private String sAuth;
    private String sStatus;

    public int getsID() {
        return sID;
    }

    public void setsID(int sID) {
        this.sID = sID;
    }

    public String getsName() {
        return sName;
    }

    public void setsName(String sName) {
        this.sName = sName;
    }

    public String getsDepen() {
        return sDepen;
    }

    public void setsDepen(String sDepen) {
        this.sDepen = sDepen;
    }

    public String getsReq() {
        return sReq;
    }

    public void setsReq(String sReq) {
        this.sReq = sReq;
    }

    public String getsIntro() {
        return sIntro;
    }

    public void setsIntro(String sIntro) {
        this.sIntro = sIntro;
    }

    public String getsVer() {
        return sVer;
    }

    public void setsVer(String sVer) {
        this.sVer = sVer;
    }

    public double getsPrice() {
        return sPrice;
    }

    public void setsPrice(double sPrice) {
        this.sPrice = sPrice;
    }

    public String getsAuth() {
        return sAuth;
    }

    public void setsAuth(String sAuth) {
        this.sAuth = sAuth;
    }

    public String getsStatus() {
        return sStatus;
    }

    public void setsStatus(String sStatus) {
        this.sStatus = sStatus;
    }
}
