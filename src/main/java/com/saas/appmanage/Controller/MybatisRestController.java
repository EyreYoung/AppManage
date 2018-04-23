package com.saas.appmanage.Controller;

import com.saas.appmanage.Entity.Admin;
import com.saas.appmanage.Mapper.AdminMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MybatisRestController {
    @Autowired
    private AdminMapper adminMapper;

    @RequestMapping(value = "/test")
    public Admin findAdminByAccount(String account){
        Admin admin = adminMapper.findByAccount(account);
        return admin;
    }

    @RequestMapping(value = "/queryAll", method = RequestMethod.GET)
    public List<Admin> findAllAdmin(){
        List<Admin> admins = adminMapper.query();
        return admins;
    }
}
