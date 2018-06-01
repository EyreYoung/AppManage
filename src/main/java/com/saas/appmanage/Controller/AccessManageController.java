package com.saas.appmanage.Controller;

import com.saas.appmanage.Entity.Authority;
import com.saas.appmanage.Entity.Service;
import com.saas.appmanage.Entity.minAuth;
import com.saas.appmanage.Entity.minminService;
import com.saas.appmanage.Mapper.AuthorityMapper;
import com.saas.appmanage.Mapper.ServiceMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AccessManageController {
    @Autowired
    AuthorityMapper authorityMapper;

    @Autowired
    ServiceMapper serviceMapper;

    //访问控制系统根据应用ID查询所有权限
    @RequestMapping(value = "/queryAuthorityByAppID",method = RequestMethod.POST)
    public List<minAuth> queryAuthorityByAppID(@RequestParam("app_id") int app_id){
        return authorityMapper.selectAuthorityByAppID(app_id);
    }

    //访问控制系统根据服务ID查询所需权限
    @RequestMapping(value = "/queryAuthByServiceID",method = RequestMethod.POST)
    public List<minAuth> queryAuthByServiceID(@RequestParam("service_id") int service_id){
        return authorityMapper.selectAuthByServiceID(service_id);
    }

    //访问控制系统根据权限ID查询相关服务
    @RequestMapping(value = "/queryServiceByAuthID",method = RequestMethod.POST)
    public List<minminService> queryServiceByAuthID(@RequestParam("auth_id") int auth_id){
        return serviceMapper.selectServicesByAuthID(auth_id);
    }
}
