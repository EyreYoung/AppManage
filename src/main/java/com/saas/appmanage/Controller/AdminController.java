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

    //应用设为推荐
    @RequestMapping(value = "/recommendApp")
    public Map<String,Object> recommendApp(@RequestParam("app_id") int app_id){
        Map<String,Object> map = new HashMap<String,Object>();
        String response = "推荐操作失败";
        int exist = 0;
        try{
            exist = appMapper.recommendApp(app_id);
        }catch (Exception e){
            exist = 0;
        }
        if(exist == 1){
            map.put("success",true);
            response = "推荐操作成功";
        }else {
            map.put("success",false);
        }
        map.put("response",response);
        return map;
    }

    //应用取消推荐
    @RequestMapping(value = "/unrecommendApp")
    public Map<String,Object> unrecommendApp(@RequestParam("app_id") int app_id){
        Map<String,Object> map = new HashMap<String,Object>();
        String response = "取消推荐操作失败";
        int exist = 0;
        try{
            exist = appMapper.unrecommendApp(app_id);
        }catch (Exception e){
            exist = 0;
        }
        if(exist == 1){
            map.put("success",true);
            response = "取消推荐操作成功";
        }else {
            map.put("success",false);
        }
        map.put("response",response);
        return map;
    }

    //查询注册审核中的应用
    @RequestMapping(value = "/queryRegApps")
    public List<App> queryRegApps(){
        return appMapper.queryRegApps();
    }

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

    //查询所有刚注册待审核的开发商
    @RequestMapping(value = "/queryRegCpys")
    public List<SVender> queryRegCpy(){
        return svenderMapper.queryRegCpys();
    }

    //开发商注册审核通过
    @RequestMapping(value = "/passRegCpy")
    public Map<String,Object> passRegCpy(@RequestParam("cpy_id") int cpy_id){
        Map<String,Object> map = new HashMap<String,Object>();
        String response = "审核通过操作未完成";
        int exist = 0;
        try{
            exist = svenderMapper.passRegCpy(cpy_id);
        }catch (Exception e){
            exist = 0;
        }
        if(exist == 1){
            map.put("success",true);
            response = "操作成功";
        }else {
            map.put("success",false);
        }
        map.put("response",response);
        return map;
    }

    //开发商注册审核不通过
    @RequestMapping(value = "/unpassRegCpy")
    public Map<String,Object> unpassRegCpy(@RequestParam("cpy_id") int cpy_id){
        Map<String,Object> map = new HashMap<String,Object>();
        String response = "审核不通过操作未完成";
        int exist = 0;
        try{
            exist = svenderMapper.unpassRegCpy(cpy_id);
        }catch (Exception e){
            exist = 0;
        }
        if(exist == 1){
            map.put("success",true);
            response = "操作成功";
        }else {
            map.put("success",false);
        }
        map.put("response",response);
        return map;
    }

    //应用注册审核通过
    @RequestMapping(value = "/passRegApp")
    public Map<String,Object> passRegApp(@RequestParam("app_id") int app_id){
        Map<String,Object> map = new HashMap<String,Object>();
        String response = "审核通过操作未完成";
        int exist = 0;
        try{
            exist = appMapper.passRegApp(app_id);
        }catch (Exception e){
            exist = 0;
        }
        if(exist == 1){
            map.put("success",true);
            response = "操作成功";
        }else {
            map.put("success",false);
        }
        map.put("response",response);
        return map;
    }

    //应用注册审核不通过
    @RequestMapping(value = "/unpassRegApp")
    public Map<String,Object> unpassRegApp(@RequestParam("app_id") int app_id){
        Map<String,Object> map = new HashMap<String,Object>();
        String response = "审核不通过操作未完成";
        int exist = 0;
        try{
            exist = appMapper.unpassRegApp(app_id);
        }catch (Exception e){
            exist = 0;
        }
        if(exist == 1){
            map.put("success",true);
            response = "操作成功";
        }else {
            map.put("success",false);
        }
        map.put("response",response);
        return map;
    }

}
