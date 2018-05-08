package com.saas.appmanage.Controller;

import com.saas.appmanage.Entity.*;
import com.saas.appmanage.Mapper.*;
import com.sun.org.apache.xpath.internal.operations.Mod;
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

    @Autowired
    ServiceMapper serviceMapper;

    @Autowired
    SVenderMapper svenderMapper;

    @Autowired
    AuthorityMapper authorityMapper;

    //插入权限
    @RequestMapping(value = "/insertAuthority",method = RequestMethod.POST)
    public Map<String,Object> insertAuthority(@RequestParam("auth_name") String auth_name,
                                              @RequestParam("app_name") String app_name){
        Map<String,Object> map = new HashMap<String,Object>();
        String response = "权限插入失败";
        int exist1 = 0;
        int exist2 = 0;
        Authority authority = new Authority();
        authority.setAuth_name(auth_name);
        authority.setApp_name(app_name);
        if(auth_name == ""||app_name == ""){

        }else{
            try{
                //插入权限
                authorityMapper.insertAuthority(authority);
                exist1 = authority.getAuth_id();
            }catch (Exception e){
                exist1 = 0;
            }
        }
        if(exist1 != 0){
            response = "权限插入成功";
        }
        map.put("response",response);
        map.put("auth_id",authority.getAuth_id());
        map.put(("auth_name"),authority.getAuth_name());
        return map;
    }

    //根据App_id查询所有权限
    @RequestMapping(value = "/queryAuthorityByAppName",method = RequestMethod.POST)
    List<Authority> queryAuthorityByAppID(@RequestParam("appname") String appname){
        return authorityMapper.selectAuthority(appname);
    }

    //根据开发商ID查询应用信息
    @RequestMapping(value = "/queryAppByCpyID",method = RequestMethod.POST)
    List<App> queryAppByCpyID(@RequestParam("cpy_id") int cpyid){
        return appMapper.SelectAppByCpyID(cpyid);
    }

    //根据应用ID查询开发商信息
    @RequestMapping(value = "/queryCpyByAppID",method = RequestMethod.POST)
    public SVender queryCpyByAppID(@RequestParam("app_id") int appid){
        return svenderMapper.selectSVenderByAppid(appid);
    }

    //根据应用ID查询应用信息
    @RequestMapping(value = "/queryAppByID",method = RequestMethod.POST)
    public App queryAppByID(@RequestParam("app_id") int appid){
        return appMapper.SearchAppByID(appid);
    }

    //插入服务
    @RequestMapping(value = "/insertService",method = RequestMethod.POST)
    public Map<String,Object> insertService(@RequestParam("mid") int mid,
                                           @RequestParam("name") String name,
                                           @RequestParam("ver") String ver,
                                           @RequestParam("req") String req){
        Map<String,Object> map = new HashMap<String,Object>();
        String response = "服务插入失败";
        int exist1 = 0;
        int exist2 = 0;
        Service service = new Service();
        service.setsName(name);
        service.setsVer(ver);
        if(name == ""||ver == ""||req ==""){

        }else{
            try{
                //插入服务
                serviceMapper.insertService(service);
                exist1 = service.getsID();
                //插入模块-服务关系
                exist2 = serviceMapper.insertModuleService(mid,service.getsID(),req);
            }catch (Exception e){
                exist1 = 0;
            }
        }
        if(exist1 != 0 && exist2 !=0){
            response = "服务插入成功";
        }
        map.put("response",response);
        map.put("sID",service.getsID());
        map.put(("sName"),service.getsName());
        return map;
    }

    //插入服务依赖关系
    @RequestMapping(value = "/insertServiceDepend",method = RequestMethod.POST)
    public Map<String,Object> insertServiceDepend(@RequestParam("ServiceID") String ServiceID,
                                                 @RequestParam("DependID") String DependID){
        Map<String,Object> map = new HashMap<String,Object>();
        String response = "服务依赖插入失败";
        int exist = 0;
        try{
            exist = serviceMapper.insertServiceDependence(ServiceID,DependID);
        }catch (Exception e){
            exist = 0;
        }
        if(exist !=0){
            response = "服务依赖插入成功";
        }
        map.put("response",response);
        return map;
    }

    //根据模块ID查询服务信息
    @RequestMapping(value = "/showServiceByModuleID",method = RequestMethod.POST)
    public List<Service> queryServices(@RequestParam("moduleid") int moduleid){
        return serviceMapper.selectService(moduleid);
    }

    //插入模块依赖关系
    @RequestMapping(value = "/insertModuleDepend",method = RequestMethod.POST)
    public Map<String,Object> insertModuleDepend(@RequestParam("moduleID1") String moduleID1,
                                                 @RequestParam("dependID") String dependID){
        Map<String,Object> map = new HashMap<String,Object>();
        String response = "模块依赖插入失败";
        int exist = 0;
        try{
            exist = moduleMapper.insertModuleDependence(moduleID1,dependID);
        }catch (Exception e){
            exist = 0;
        }
        if(exist !=0){
            response = "success";
        }
        map.put("response",response);
        return map;
    }

    //插入模块
    @RequestMapping(value = "/insertModule",method = RequestMethod.POST)
    public Map<String,Object> insertModule(@RequestParam("appname") String appname,
                                           @RequestParam("name") String name,
                                           @RequestParam("ver") String ver,
                                           @RequestParam("req") String req){
        Map<String,Object> map = new HashMap<String,Object>();
        String response = "模块插入失败";
        int exist1 = 0;
        int exist2 = 0;
        Module module = new Module();
        module.setmName(name);
        module.setVer(ver);
        if(name == ""||ver == ""||req ==""){

        }else{
            try{
                //插入模块
                moduleMapper.insertModule(module);
                exist1 = module.getmID();
                //插入应用-模块关系
                exist2 = moduleMapper.insertAppModule(appname,module.getmID(),req);
            }catch (Exception e){
                exist1 = 0;
            }
        }
        if(exist1 != 0 && exist2 !=0){
            response = "模块插入成功";
        }
        map.put("response",response);
        map.put("mID",module.getmID());
        map.put(("mName"),module.getmName());
        return map;
    }

    //根据应用名查询模块
    @RequestMapping(value = "/showModuleByAppName",method = RequestMethod.POST)
    public List<Module> queryModules(@RequestParam("appname") String appname){
        return moduleMapper.selectModule(appname);
    }

    //注册应用基本信息
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

    //分类查询应用
    @RequestMapping(value = "/queryAppByCata",method = RequestMethod.POST)
    public List<App> queryAppByCata(@RequestParam("cata") String catagory){
        return appMapper.SelectAppByCata(catagory);
    }

    //模糊搜索应用
    @RequestMapping(value = "/queryAppByQW",method = RequestMethod.POST)
    public List<App> queryAppByQW(@RequestParam("qw") String QW){
        return appMapper.SearchApp(QW);
    }

    //开发商下架应用
    @RequestMapping(value = "/dropAppByID",method = RequestMethod.POST)
    public Map<String,String> dropAppByID(@RequestParam("app_id") int appid){
        Map<String,String> map = new HashMap<String,String>();
        String response = "下架失败";
        int exist = 0;
        try{
            exist = appMapper.dropAppByID(appid);
        }catch (Exception e){
            exist = 0;
        }
        if(exist == 1){
            response = "下架应用成功";
        }
        map.put("response",response);
        return map;
    }

    //开发商删除应用
    @RequestMapping(value = "/deleteAppByID",method = RequestMethod.POST)
    public Map<String,String> deleteAppByID(@RequestParam("app_id") int appid){
        Map<String,String> map = new HashMap<String,String>();
        String response = "删除失败";
        int exist = 0;
        try{
            exist = appMapper.deleteAppByID(appid);
        }catch (Exception e){
            exist = 0;
        }
        if(exist == 1){
            response = "删除应用成功";
        }
        map.put("response",response);
        return map;
    }

    //开发商修改应用基本信息
    @RequestMapping(value = "/updateAppByID",method = RequestMethod.POST)
    public Map<String,String> updateAppByID(@RequestParam("app_id") int appid,
                                            @RequestParam("newname") String newname,
                                            @RequestParam("newcata") String newcata,
                                            @RequestParam("newintro") String newintro){
        Map<String,String> map = new HashMap<String,String>();
        String response = "修改失败";
        int exist = 0;
        if(newname!=null||newname!=""||newcata!=null||newcata!=""||newintro!=null||newintro!=""){
            try{
                exist = appMapper.updateAppByID(newname,newcata,newintro,appid);
            }catch (Exception e){
                exist = 0;
            }
        }else{
            response = "有空值，修改失败";
        }
        if(exist == 1){
            response = "修改应用成功";
        }
        map.put("response",response);
        return map;
    }
}
