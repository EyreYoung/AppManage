package com.saas.appmanage.Controller;


import com.saas.appmanage.JsonResult;
import com.saas.appmanage.Mapper.AdminMapper;
import com.saas.appmanage.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminMapper adminMapper;

    @RequestMapping(value = {"/doLogin","/doLogin/"}, method = RequestMethod.POST)
    public Map<String,Object> doAdminLogin(@RequestParam("account") String account,
                                           @RequestParam("password") String password){
        Map<String,Object> map = new HashMap<String,Object>();
        int exist = 0;

        try{
            exist = adminMapper.findAdmin(account, password);
        }catch (Exception e){
            exist = 0;
        }
        map.put("response",exist);
        return map;
    }

}
