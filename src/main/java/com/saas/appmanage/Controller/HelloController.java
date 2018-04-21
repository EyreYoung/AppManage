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
@RequestMapping("/admin")
public class HelloController {
    @Autowired
    private AdminMapper adminMapper;

    @RequestMapping(value = "", method = RequestMethod.POST)
    public JsonResult doAdminLogin(@RequestParam("account") String account,
                                   @RequestParam("password") String password){
        int adminID = -1;

        try{
            adminID = adminMapper.findID(account, password);
        }catch (Exception e){
            adminID = -1;
        }
        return adminID != -1 ? JsonResult.ok(adminID) : JsonResult.build(StatusCode.FAIL_RES_NOT_FOUND);
    }

    @RequestMapping(value = "/login")
    public String index(){
        return "index";
    }

}
