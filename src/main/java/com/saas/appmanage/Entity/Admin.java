package com.saas.appmanage.Entity;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotEmpty;

public class Admin {
    private int ID;

    private String Account;

    private String Password;

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getAccount() {
        return Account;
    }

    public void setAccount(String account) {
        Account = account;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

}
