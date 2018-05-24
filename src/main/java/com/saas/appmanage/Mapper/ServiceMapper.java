package com.saas.appmanage.Mapper;

import com.saas.appmanage.Entity.Service;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ServiceMapper {

    //根据模块ID删除服务
    @Delete("delete from service where ID = ${service_id}")
    int deleteServiceByID(@Param("service_id") int service_id);

    //服务升级方式完成升级
    @Update("update service set Status = '正常', Version = #{newver} where ID = ${service_id}")
    int updateServiceFinish(@Param("service_id") int service_id,
                           @Param("newver") String newver);

    //根据开发商ID查询升级中服务信息
    @Select("select a.Name as sApp,m.Name as sModule,s.ID as sID,s.Name as sName,ms.Required as sReq,s.Intro as sIntro,s.Version as sVer,s.Price as sPrice,s.Status as sStatus from app as a,appmodule as am,module as m,moduleservice as ms,service as s where a.ID = am.AppID and am.ModuleID = m.ID and m.ID = ms.ModuleID and ms.ServiceID = s.ID and a.SVID = ${cpy_id} and s.Status = '升级中'")
    List<Service> SelectUpdatedServiceByCpyID(@Param("cpy_id") int cpy_id);

    //服务升级方式升级应用
    @Update("update service set Status = '升级中' where Status = '正常' and ID = ${service_id}")
    int updateService(@Param("service_id") int service_id);

      //根据模块ID找到所有服务信息 serviceplus(包含服务依赖信息)
//    @Select("SELECT se.ID AS sID, se.NAME AS sName, se.依赖服务 AS sDepen, ms.Required AS sReq, se.Version AS sVer FROM moduleservice AS ms,(SELECT s.ID,s.NAME,de.依赖服务,s.Version FROM service AS s LEFT JOIN (SELECT ServiceID AS sID,GROUP_CONCAT(DISTINCT s.NAME) AS 依赖服务 FROM servicedependence AS sd,service AS s WHERE s.ID = sd.Depend GROUP BY ServiceID) AS de ON s.ID = de.sID) AS se WHERE se.ID = ms.ServiceID AND ms.ModuleID =#{mID}")
//    List<Service> selectService(@Param("mID") int mID);

    //根据模块ID找到所有服务信息 serviceplus(包含服务依赖信息、服务权限信息)
    @Select("select mID,sID,sName,sDepen,sReq,sVer,sAuth,sIntro,sPrice,sStatus from (select auser.service_id,GROUP_CONCAT(DISTINCT a.auth_name) as sAuth from authority as a,authorityservice as auser where a.auth_id=auser.authority_id GROUP BY service_id) as au RIGHT JOIN serviceplus as sp on sp.sID = au.service_id where mID = ${mID}")
    List<Service> selectService(@Param("mID") int mID);

    //插入服务
    @Insert("insert into service(Name,Version,Intro,Price) values(#{sName},#{sVer},#{sIntro},#{sPrice})")
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
