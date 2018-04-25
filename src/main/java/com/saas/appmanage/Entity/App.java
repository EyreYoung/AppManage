package com.saas.appmanage.Entity;

import java.util.Date;

public class App {
    private int No;
    private int ID;
    private String Name;
    private String SVenderName;
    private String regDate;
    private String Type;
    private String Catagory;
    private String Intro;
    private int Star;
    private String Rec;
    private String Version;

    public int getNo() {
        return No;
    }

    public void setNo(int no) {
        No = no;
    }

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

    public String getType() {
        return Type;
    }

    public void setType(String type) {
        Type = type;
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

    public int getStar() {
        return Star;
    }

    public void setStar(int star) {
        Star = star;
    }

    public String getRec() {
        return Rec;
    }

    public void setRec(String rec) {
        Rec = rec;
    }

    public String getVersion() {
        return Version;
    }

    public void setVersion(String version) {
        Version = version;
    }
}
