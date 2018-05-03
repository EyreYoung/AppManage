package com.saas.appmanage.Controller;

import com.saas.appmanage.JsonResult;
import com.saas.appmanage.Mapper.AdminMapper;
import com.saas.appmanage.StatusCode;
import org.apache.juli.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.logging.Logger;

@Controller
public class HelloController {

    @RequestMapping(value = "/index")
    public String index(){
        return "index";
    }

    @RequestMapping(value = "/admin/login")
    public String adminLogin(){
        return "admin/adminLogin";
    }

    @RequestMapping(value = "/admin/manage")
    public String companyManage(){
        return "admin/adminManage";
    }

    @RequestMapping(value = "/company/login")
    public String companyLogin(){
        return "company/companyLogin";
    }

    @RequestMapping(value = "/company/register")
    public String companyRegister(){
        return "company/companyRegister";
    }

    @RequestMapping(value = "/company/registerapp")
    public String companyRegisterApp(){
        return "company/RegisterApp";
    }

    @RequestMapping(value = "/apps")
    public String showApps(){
        return "app/appCatagory";
    }

    @RequestMapping(value = "/company/manage")
    public String companyManage(Model model, @RequestParam("cpy_id") int cpyid){
        model.addAttribute("cpy_id",cpyid);
        return "company/RegisterApp";
    }

    @RequestMapping(value = "/appsearch")
    public String searchApp(Model model,@RequestParam("qw") String qw){
        model.addAttribute("queryword",qw);
        return "app/appCatagory";
    }
}
