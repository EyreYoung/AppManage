package com.saas.appmanage.Controller;

import com.saas.appmanage.Entity.App;
import com.saas.appmanage.Entity.Module;
import com.saas.appmanage.Mapper.AppMapper;
import com.saas.appmanage.Mapper.ModuleMapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

//import java.sql.Date;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class AppController {
    @Autowired
    AppMapper appMapper;

    @Autowired
    ModuleMapper moduleMapper;

    @RequestMapping(value = "/insertModule",method = RequestMethod.POST)
    public Map<String,String> insertModule(@RequestParam("name") String name,
                            @RequestParam("ver") String ver){
        Map<String,String> map = new HashMap<String,String>();
        String response = "插入失败";
        int exist = 0;
        if(name == ""||ver == ""){

        }else{
            try{
                exist = moduleMapper.insertModule(name,ver);
            }catch (Exception e){
                exist = 0;
            }
        }
        if(exist == 1){
            response = name;
        }
        map.put("response",response);
        return map;
    }

    @RequestMapping(value = "/showModuleByAppName",method = RequestMethod.POST)
    public List<Module> queryModules(@RequestParam("appname") String appname){
        return moduleMapper.selectModule(appname);
    }

    @RequestMapping(value = "/company/doRegisterAppStep1",method = RequestMethod.POST)
    public Map<String,String> doRegisterApp(@RequestParam("name") String name,
                                            @RequestParam("svname") String svname,
                                            @RequestParam("catagory") String catagory,
                                            @RequestParam("intro") String intro,
                                            @RequestParam("version") String version){
        Map<String,String> map = new HashMap<String,String>();
        String response = "插入失败";
        int exist = 0;
        Date nowDate = new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        String today = df.format(nowDate);
        if(name == ""||svname == ""||catagory == ""||version == ""){

        }else{
            try{
                exist = appMapper.insertApp(name,svname,today,catagory,intro,version);
            }catch (Exception e){
                exist = 0;
            }
        }
        if(exist == 1){
            response = name;
        }
        map.put("response",response);
        return map;
    }

    @RequestMapping(value = "/company/uploadimg",method = RequestMethod.POST)
    public String uploadImg(@RequestParam("file")CommonsMultipartFile file) throws Exception{
        String path="D:/GitHub/AppManage/src/main/resources/static/img/"+file.getOriginalFilename();
        File newFile = new File(path);
        Map<String, String> map = new HashMap<String, String>();
        map.put("pathUrl", path);
        return path;
    }

    @RequestMapping(value = "/queryAppByCata",method = RequestMethod.POST)
    public List<App> queryAppByCata(@RequestParam("cata") String catagory){
        return appMapper.SelectAppByCata(catagory);
    }

}
