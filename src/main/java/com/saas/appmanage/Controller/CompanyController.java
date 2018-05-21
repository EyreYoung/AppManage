package com.saas.appmanage.Controller;


import com.saas.appmanage.Entity.SVender;
import com.saas.appmanage.Mapper.SVenderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/company")
@SessionAttributes(value = {"account","password","character"})
public class CompanyController {
    @Autowired
    private SVenderMapper svenderMapper;

    //根据ID修改开发商信息
    @RequestMapping(value = "/updateCpyByID", method = RequestMethod.POST)
    public Map<String,Object> updateCpyByID(@RequestParam("cpy_id") int cpy_id,
                                                @RequestParam("password") String password,
                                                @RequestParam("company") String company,
                                                @RequestParam("mail") String mail,
                                                @RequestParam("tel") String tel){
        int exist = 0;
        String response = "开发商信息更新失败";
        Map<String,Object> map = new HashMap<String,Object>();
        try{
            exist = svenderMapper.updateCpyByID(password,company,tel,mail,cpy_id);
        }catch (Exception e){
            exist = 0;
        }
        if(exist == 1){
            map.put("success",true);
            response = "开发商信息更新成功";
        }else {
            map.put("success",false);
        }
        map.put("response",response);
        return map;
    }

    //开发者注册
    @RequestMapping(value = "/doRegister", method = RequestMethod.POST)
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
    public Map<String,Object> doCpyLogin(@RequestParam("account") String account,
                                         @RequestParam("password") String password,
                                         HttpSession session){
        Map<String,Object> map = new HashMap<String,Object>();
        int exist = 0;

        try{
            exist = svenderMapper.findCpy(account, password);
        }catch (Exception e){
            exist = 0;
        }
        if(exist != 0){
            session.setAttribute("account",account);
            session.setAttribute("password",password);
            session.setAttribute("cpy_id",exist);
            session.setAttribute("character","company");
            map.put("success",true);
            map.put("message","登录成功");
            map.put("cpy_id",exist);
        }else {
            map.put("success",false);
            map.put("message","登录失败");
        }
        return map;
    }

    //用id获取公司名
    @RequestMapping(value = "/queryCpy", method = RequestMethod.POST)
    public List<SVender> queryCpy(@RequestParam("id") int id){
        return svenderMapper.findCpyByID(id);
    }
}
