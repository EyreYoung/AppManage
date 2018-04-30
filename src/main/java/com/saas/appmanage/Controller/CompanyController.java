package com.saas.appmanage.Controller;


import com.saas.appmanage.Entity.SVender;
import com.saas.appmanage.Mapper.SVenderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/company")
public class CompanyController {
    @Autowired
    private SVenderMapper svenderMapper;

    @RequestMapping(value = "/doRegister", method = RequestMethod.POST)//开发者注册
    public Map<String,Object> doCompanyRegister(@RequestParam("account") String account,
                                                @RequestParam("password") String password,
                                                @RequestParam("company") String company,
                                                @RequestParam("mail") String mail,
                                                @RequestParam("tel") String tel){
        int insertID = -1;
        Map<String,Object> map = new HashMap<String,Object>();
        try{
            insertID = svenderMapper.insertSVender(account,password,company,mail,tel);
        }catch (Exception e){
            insertID = -1;
        }
        map.put("response",insertID);
        return map;
    }


    @RequestMapping(value = "/doLogin", method = RequestMethod.POST)
    public Map<String,Object> doAdminLogin(@RequestParam("account") String account,
                                           @RequestParam("password") String password){
        Map<String,Object> map = new HashMap<String,Object>();
        int exist = 0;

        try{
            exist = svenderMapper.findCpy(account, password);
        }catch (Exception e){
            exist = 0;
        }
        map.put("response",exist);
        return map;
    }

    @RequestMapping(value = "/queryCpy", method = RequestMethod.POST)//用id获取公司名
    public Map<String,Object> queryCpy(@RequestParam("id") int id){
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("cpy",svenderMapper.findCpyByID(id));
        return map;
    }
}
