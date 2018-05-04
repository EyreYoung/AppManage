package com.saas.appmanage.Entity;

public class Service {
    private int sID;
    private String sName;
    private String sDepen;
    private String sReq;
    private String sVer;

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

    public String getsVer() {
        return sVer;
    }

    public void setsVer(String sVer) {
        this.sVer = sVer;
    }
}
