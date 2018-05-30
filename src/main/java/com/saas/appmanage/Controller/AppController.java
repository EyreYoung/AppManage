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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

//import java.sql.Date;
import java.io.File;
import java.io.IOException;
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

    //按热度排序应用
    @RequestMapping(value = "/queryHotApps")
    public List<App> queryHotApps(){
        return appMapper.queryHotApps();
    }

    //查询所有推荐应用
    @RequestMapping(value = "/queryRecApps")
    public List<App> queryRecApps(){
        return appMapper.queryRecApps();
    }

    //根据服务ID删除权限
    @RequestMapping(value = "/deleteServiceByID",method = RequestMethod.POST)
    public Map<String,Object> deleteServiceByID(@RequestParam("service_id") int service_id){
        Map<String,Object> map = new HashMap<String,Object>();
        String response = "删除服务失败";
        map.put("success",false);
        int exist = 0;
        try{
            exist = serviceMapper.deleteServiceByID(service_id);
        }catch (Exception e){
            exist = 0;
        }
        if(exist == 1){
            response = "删除服务成功";
            map.put("success",true);
        }
        map.put("response",response);
        return map;
    }

    //根据模块ID删除权限
    @RequestMapping(value = "/deleteModuleByID",method = RequestMethod.POST)
    public Map<String,Object> deleteModuleByID(@RequestParam("module_id") int module_id){
        Map<String,Object> map = new HashMap<String,Object>();
        String response = "删除模块失败";
        map.put("success",false);
        int exist = 0;
        try{
            exist = moduleMapper.deleteModuleByID(module_id);
        }catch (Exception e){
            exist = 0;
        }
        if(exist == 1){
            response = "删除模块成功";
            map.put("success",true);
        }
        map.put("response",response);
        return map;
    }

    //根据权限ID删除权限
    @RequestMapping(value = "/deleteAuthByID",method = RequestMethod.POST)
    public Map<String,Object> deleteAuthByID(@RequestParam("auth_id") int auth_id){
        Map<String,Object> map = new HashMap<String,Object>();
        String response = "删除权限失败";
        map.put("success",false);
        int exist = 0;
        try{
            exist = authorityMapper.deleteAuthorityByID(auth_id);
        }catch (Exception e){
            exist = 0;
        }
        if(exist == 1){
            response = "删除权限成功";
            map.put("success",true);
        }
        map.put("response",response);
        return map;
    }

    //模块升级方式完成升级
    @RequestMapping(value = "/updateServiceFinishByID")
    public Map<String,Object> updateServiceFinishByID(@RequestParam("service_id") int service_id,
                                                     @RequestParam("newver") String newver){
        Map<String,Object> map = new HashMap<String,Object>();
        String response = "升级服务未完成";
        int exist = 0;
        if(newver!=null&&newver!=""){
            try{
                exist = serviceMapper.updateServiceFinish(service_id,newver);
            }catch (Exception e){
                exist = 0;
            }
        }else{
            map.put("response","输入值不能为空！");
        }
        if(exist == 1){
            map.put("success",true);
            response = "升级服务完成";
        }else {
            map.put("success",false);
        }
        map.put("response",response);
        return map;
    }

    //根据开发商ID查询升级中服务信息
    @RequestMapping(value = "/queryUpdatedServiceByCpyID",method = RequestMethod.POST)
    public List<Service> queryUpdatedServiceByCpyID(@RequestParam("cpy_id") int cpy_id){
        return serviceMapper.SelectUpdatedServiceByCpyID(cpy_id);
    }

    //服务升级方式升级应用
    @RequestMapping(value = "/updateServiceByID")
    public Map<String,Object> updateServiceByID(@RequestParam("service_id") int service_id){
        Map<String,Object> map = new HashMap<String,Object>();
        String response = "升级服务失败";
        int exist = 0;
        try{
            exist = serviceMapper.updateService(service_id);
        }catch (Exception e){
            exist = 0;
        }
        if(exist == 1){
            map.put("success",true);
            response = "升级服务成功";
        }else {
            map.put("success",false);
        }
        map.put("response",response);
        return map;
    }

    //模块升级方式完成升级
    @RequestMapping(value = "/updateModuleFinishByID")
    public Map<String,Object> updateModuleFinishByID(@RequestParam("module_id") int module_id,
                                                       @RequestParam("newver") String newver){
        Map<String,Object> map = new HashMap<String,Object>();
        String response = "升级模块未完成";
        int exist = 0;
        if(newver!=null&&newver!=""){
            try{
                exist = moduleMapper.updateModuleFinish(module_id,newver);
            }catch (Exception e){
                exist = 0;
            }
        }else{
            map.put("response","输入值不能为空！");
        }
        if(exist == 1){
            map.put("success",true);
            response = "升级模块完成";
        }else {
            map.put("success",false);
        }
        map.put("response",response);
        return map;
    }

    //根据开发商ID查询升级中模块信息
    @RequestMapping(value = "/queryUpdatedMoudleByCpyID",method = RequestMethod.POST)
    public List<Module> queryUpdatedMoudleByCpyID(@RequestParam("cpy_id") int cpy_id){
        return moduleMapper.SelectUpdatedModuleByCpyID(cpy_id);
    }

    //模块升级方式升级应用
    @RequestMapping(value = "/updateModuleByID")
    public Map<String,Object> updateModuleByID(@RequestParam("module_id") int module_id){
        Map<String,Object> map = new HashMap<String,Object>();
        String response = "升级模块失败";
        int exist = 0;
        try{
            exist = moduleMapper.updateModule(module_id);
        }catch (Exception e){
            exist = 0;
        }
        if(exist == 1){
            map.put("success",true);
            response = "升级模块成功";
        }else {
            map.put("success",false);
        }
        map.put("response",response);
        return map;
    }

    //应用升级方式完成升级
    @RequestMapping(value = "/updateAppFinishByAppName")
    public Map<String,Object> updateAppFinishByAppName(@RequestParam("appname") String appname,
                                                       @RequestParam("newver") String newver){
        Map<String,Object> map = new HashMap<String,Object>();
        String response = "升级应用未完成";
        int exist = 0;
        if(appname!=null&&appname!=""&&newver!=null&&newver!=""){
            try{
                exist = appMapper.updateAppFinish(appname,newver);
            }catch (Exception e){
                exist = 0;
            }
        }else{
            map.put("response","输入值不能为空！");
        }
        if(exist == 1){
            map.put("success",true);
            response = "升级应用完成";
        }else {
            map.put("success",false);
        }
        map.put("response",response);
        return map;
    }

    //根据开发商ID查询升级中应用信息
    @RequestMapping(value = "/queryUpdatedAppByCpyID",method = RequestMethod.POST)
    public List<App> queryUpdatedAppByCpyID(@RequestParam("cpy_id") int cpyid){
        return appMapper.SelectUpdatedAppByCpyID(cpyid);
    }

    //应用升级方式升级应用
    @RequestMapping(value = "/updateAppByAppName")
    public Map<String,Object> updateAppByAppName(@RequestParam("appname") String appname){
        Map<String,Object> map = new HashMap<String,Object>();
        String response = "升级应用失败";
        int exist = 0;
        if(appname!=null){
            try{
                exist = appMapper.updateApp(appname);
            }catch (Exception e){
                exist = 0;
            }
        }
        if(exist == 1){
            map.put("success",true);
            response = "升级应用成功";
        }else {
            map.put("success",false);
        }
        map.put("response",response);
        return map;
    }

    //查出同类型应用并按热度排行
    @RequestMapping(value = "/queryRelaApps")
    public List<App> queryRelaApps(@RequestParam("app_id") int app_id){
        return appMapper.SelectRelaAppByID(app_id);
    }

    //进入应用详情界面将应用热度加1
    @RequestMapping(value = "/updateAppClicks")
    public Map<String,Object> updateAppClicks(@RequestParam("app_id") int app_id){
        Map<String,Object> map = new HashMap<String,Object>();
        String response = "应用自增失败";
        int exist = 0;
        try{
            exist = appMapper.updateAppClicks(app_id);
        }catch (Exception e){
            exist = 0;
        }
        if(exist == 1){
            response = "应用热度热度+1";
        }
        map.put("response",response);
        return map;
    }

    //插入服务-权限关系
    @RequestMapping(value = "/insertAuthorityService",method = RequestMethod.POST)
    public Map<String,Object> insertAuthorityService(@RequestParam("auth_id") int auth_id,
                                                    @RequestParam("ser_id") int ser_id){
        Map<String,Object> map = new HashMap<String,Object>();
        String response = "服务-权限关系插入失败";
        int exist = 0;
        try{
            exist = authorityMapper.insertAuthorityService(auth_id,ser_id);
        }catch (Exception e){
            exist = 0;
        }
        if(exist !=0){
            response = "服务-权限关系插入成功";
        }
        map.put("response",response);
        return map;
    }

    //插入权限
    @RequestMapping(value = "/insertAuthority",method = RequestMethod.POST)
    public Map<String,Object> insertAuthority(@RequestParam("auth_name") String auth_name,
                                              @RequestParam("auth_intro") String auth_intro,
                                              @RequestParam("app_name") String app_name){
        Map<String,Object> map = new HashMap<String,Object>();
        String response = "权限插入失败";
        int exist1 = 0;
        int exist2 = 0;
        Authority authority = new Authority();
        authority.setAuth_name(auth_name);
        authority.setAuth_intro(auth_intro);
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

    //根据App_Name查询所有权限
    @RequestMapping(value = "/queryAuthorityByAppName",method = RequestMethod.POST)
    public List<Authority> queryAuthorityByAppID(@RequestParam("appname") String appname){
        return authorityMapper.selectAuthority(appname);
    }

    //根据开发商ID查询应用信息
    @RequestMapping(value = "/queryAppByCpyID",method = RequestMethod.POST)
    public List<App> queryAppByCpyID(@RequestParam("cpy_id") int cpyid){
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
                                            @RequestParam("req") String req,
                                            @RequestParam("intro") String intro,
                                            @RequestParam("price") double price){
        Map<String,Object> map = new HashMap<String,Object>();
        String response = "服务插入失败";
        int exist1 = 0;
        int exist2 = 0;
        Service service = new Service();
        service.setsName(name);
        service.setsVer(ver);
        service.setsIntro(intro);
        service.setsPrice(price);
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
                                           @RequestParam("intro") String intro,
                                           @RequestParam("req") String req){
        Map<String,Object> map = new HashMap<String,Object>();
        String response = "模块插入失败";
        int exist1 = 0;
        int exist2 = 0;
        Module module = new Module();
        module.setmName(name);
        module.setmIntro(intro);
        module.setVer(ver);
        if(name == ""||ver == ""||req ==""){
            response = "模块信息填写不完全，请重试";
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
    public Map<String,Object> doRegisterApp(@RequestParam("name") String name,
                                            @RequestParam("svname") String svname,
                                            @RequestParam("catagory") String catagory,
                                            @RequestParam("intro") String intro,
                                            @RequestParam("version") String version){
        Map<String,Object> map = new HashMap<String,Object>();
        String response = "插入失败";
        int exist = 0;
        map.put("success",false);
        Date nowDate = new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        String today = df.format(nowDate);
        App app = new App();
        if(name == ""||svname == ""||catagory == ""||version == ""){
            response = "必填项未空值，填写后重试";
        }else{
            try{
                app.setName(name);
                app.setSVenderName(svname);
                app.setCatagory(catagory);
                app.setRegDate(today);
                app.setIntro(intro);
                app.setVersion(version);
                app.setStatus("审核中");
                appMapper.insertApp(app);
                exist = app.getID();
            }catch (Exception e){
                exist = 0;
            }
        }
        if(exist != 0){
            response = name;
            map.put("success",true);
            map.put("id",exist);
        }
        map.put("response",response);
        return map;
    }

    //注册应用上传图片
    @RequestMapping(value = "/uploadimg")
    public Map<String, Object> uploadImg(@RequestParam("file") CommonsMultipartFile file) throws IOException {
        String path="D://GitHub//"+file.getOriginalFilename();
        File newFile = new File(path);
        try {
            file.transferTo(newFile);
            System.out.println("上传成功");
        } catch (IOException e) {
            e.printStackTrace();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("pathUrl", path);
        return map;
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
