package com.saas.appmanage.Controller;

import com.saas.appmanage.Entity.*;
import com.saas.appmanage.Mapper.AppMapper;
import com.saas.appmanage.Mapper.ModuleMapper;
import com.saas.appmanage.Mapper.ServiceMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TenantManageController {
    @Autowired
    AppMapper appMapper;

    @Autowired
    ModuleMapper moduleMapper;

    @Autowired
    ServiceMapper serviceMapper;

    //租户管理系统查询所有应用
    @RequestMapping(value = "/queryAppsForSale",method = RequestMethod.GET)
    public List<minApp> selectAllApp(){
        return appMapper.queryAppsForSale();
    }

    //租户管理系统根据应用ID查询所有模块信息
    @RequestMapping(value = "/queryModulesByAppID",method = RequestMethod.POST)
    public List<minModule> queryModulesByAppID(@RequestParam("app_id") int app_id){
        return moduleMapper.selectModuleByAppID(app_id);
    }

    //租户管理系统根据模块ID查询所有服务信息
    @RequestMapping(value = "/queryServicesByModuleID",method = RequestMethod.POST)
    public List<minService> queryServicesByModuleID(@RequestParam("module_id") int module_id){
        return serviceMapper.selectServiceByModuleID(module_id);
    }
}
