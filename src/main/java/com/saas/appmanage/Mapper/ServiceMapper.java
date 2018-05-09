package com.saas.appmanage.Mapper;

import com.saas.appmanage.Entity.Service;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ServiceMapper {

//    //根据模块ID找到所有服务信息 serviceplus(包含服务依赖信息)
//    @Select("SELECT se.ID AS sID, se.NAME AS sName, se.依赖服务 AS sDepen, ms.Required AS sReq, se.Version AS sVer FROM moduleservice AS ms,(SELECT s.ID,s.NAME,de.依赖服务,s.Version FROM service AS s LEFT JOIN (SELECT ServiceID AS sID,GROUP_CONCAT(DISTINCT s.NAME) AS 依赖服务 FROM servicedependence AS sd,service AS s WHERE s.ID = sd.Depend GROUP BY ServiceID) AS de ON s.ID = de.sID) AS se WHERE se.ID = ms.ServiceID AND ms.ModuleID =#{mID}")
//    List<Service> selectService(@Param("mID") int mID);

    //根据模块ID找到所有服务信息 serviceplus(包含服务依赖信息、服务权限信息)
    @Select("select mID,sID,sName,sDepen,sReq,sVer,sAuth from (select auser.service_id,GROUP_CONCAT(DISTINCT a.auth_name) as sAuth from authority as a,authorityservice as auser where a.auth_id=auser.authority_id GROUP BY service_id) as au RIGHT JOIN serviceplus as sp on sp.sID = au.service_id where mID = ${mID}")
    List<Service> selectService(@Param("mID") int mID);

    //插入服务
    @Insert("insert into service(Name,Version) values(#{sName},#{sVer})")
    @Options(useGeneratedKeys = true, keyProperty = "sID", keyColumn = "ID")
    int insertService(Service service);

    //插入模块-服务关系
    @Insert("insert into moduleservice(ModuleID,ServiceID,Required) values(#{mid},#{sid},#{required})")
    int insertModuleService(@Param("mid") int mid,
                            @Param("sid") int sid,
                            @Param("required") String required);

    //插入服务依赖
    @Insert("insert into servicedependence values(#{ServiceID},#{Depend})")
    int insertServiceDependence(@Param("ServiceID") String ServiceID,
                               @Param("Depend") String Depend);
}
