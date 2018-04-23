package com.saas.appmanage.Controller;

import com.saas.appmanage.JsonResult;
import com.saas.appmanage.Mapper.AdminMapper;
import com.saas.appmanage.StatusCode;
import org.apache.juli.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.logging.Logger;

@Controller
public class HelloController {
    @Autowired
    private AdminMapper adminMapper;

    @RequestMapping(value = "/index")
    public String index(){
        return "index";
    }

    @RequestMapping(value = "/admin/login")
    public String adminLogin(){
        return "admin/adminLogin";
    }

    @RequestMapping(value = "/company/login")
    public String companyLogin(){
        return "company/companyLogin";
    }

    @RequestMapping(value = "/company/register")
    public String companyRegister(){
        return "company/companyRegister";
    }


}
