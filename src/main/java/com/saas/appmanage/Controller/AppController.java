package com.saas.appmanage.Controller;

import com.saas.appmanage.Mapper.AppMapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
public class AppController {
    @Autowired
    AppMapper appMapper;

    @RequestMapping(value = "/company/doRegisterApp",method = RequestMethod.POST)
    public Map<String,Object> doRegisterApp(@RequestParam("name") String name,
                                            @RequestParam("svname") String svname,
                                            //@RequestParam("regdate") Date regdate,
                                            @RequestParam("catagory") String catagory,
                                            @RequestParam("intro") String intro,
                                            @RequestParam("version") String version){
        Map<String,Object> map = new HashMap<String,Object>();
        String response = "插入失败";
        int exist = 0;
        Date nowDate = new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        String today = df.format(nowDate);
        try{
            exist = appMapper.insertApp(name,svname,today,catagory,intro,version);
        }catch (Exception e){
            exist = 0;
        }
        if(exist == 1){
            response = svname;
        }
        map.put("response",response);
        return map;
    }

}
