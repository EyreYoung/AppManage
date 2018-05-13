package com.saas.appmanage.Entity;

public class Module {
    private int mID;
    private String mName;
    private String depen;
    private String mIntro;
    private String ver;

    public int getmID() {
        return mID;
    }

    public void setmID(int mID) {
        this.mID = mID;
    }

    public String getmName() {
        return mName;
    }

    public void setmName(String mName) {
        this.mName = mName;
    }

    public String getDepen() {
        return depen;
    }

    public void setDepen(String depen) {
        this.depen = depen;
    }

    public String getmIntro() {
        return mIntro;
    }

    public void setmIntro(String mIntro) {
        this.mIntro = mIntro;
    }

    public String getVer() {
        return ver;
    }

    public void setVer(String ver) {
        this.ver = ver;
    }
}
