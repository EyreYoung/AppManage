package com.saas.appmanage.Entity;

public class minApp {
    private int ID;
    private String Name;
    private String SVenderName;
    private String regDate;
    private String Catagory;
    private String Intro;
    private String Version;

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getSVenderName() {
        return SVenderName;
    }

    public void setSVenderName(String SVenderName) {
        this.SVenderName = SVenderName;
    }

    public String getRegDate() {
        return regDate;
    }

    public void setRegDate(String regDate) {
        this.regDate = regDate;
    }

    public String getCatagory() {
        return Catagory;
    }

    public void setCatagory(String catagory) {
        Catagory = catagory;
    }

    public String getIntro() {
        return Intro;
    }

    public void setIntro(String intro) {
        Intro = intro;
    }

    public String getVersion() {
        return Version;
    }

    public void setVersion(String version) {
        Version = version;
    }
}
