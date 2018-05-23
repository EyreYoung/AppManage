package com.saas.appmanage.Controller;


import com.saas.appmanage.Entity.Admin;
import com.saas.appmanage.Entity.App;
import com.saas.appmanage.Entity.SVender;
import com.saas.appmanage.Mapper.AdminMapper;
import com.saas.appmanage.Mapper.AppMapper;
import com.saas.appmanage.Mapper.SVenderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@SessionAttributes(value = {"account","password","character"})
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminMapper adminMapper;

    @Autowired
    private AppMapper appMapper;

    @Autowired
    private SVenderMapper svenderMapper;

    //管理员登录
    @RequestMapping(value = {"/doLogin"}, method = RequestMethod.POST)
    public Map<String,Object> doAdminLogin(@RequestParam("account") String account,
                                           @RequestParam("password") String password,
                                           HttpSession session){
        Map<String,Object> map = new HashMap<String,Object>();
        int exist = 0;

        try{
            exist = adminMapper.findAdmin(account, password);
        }catch (Exception e){
            exist = 0;
        }
        if(exist == 1){
            session.setAttribute("account",account);
            session.setAttribute("password",password);
            session.setAttribute("character","admin");
            map.put("success",true);
            map.put("message","登录成功");
        }else{
            map.put("success",false);
            map.put("message","登录失败");
        }
        return map;
    }
    //查询所有应用
    @RequestMapping(value = "/queryApps")
    public List<App> selectAllApp(){
        return appMapper.SelectApp();
    }

    //管理员查看管理员
    @RequestMapping(value = "/queryAdmins")
    public List<Admin> queryAdmins(){
        return adminMapper.queryAdmins();
    }

    //管理员查看开发者
    @RequestMapping(value = "/queryCpys")
    public List<SVender> queryCpys(){
        return svenderMapper.queryCpys();
    }


}
