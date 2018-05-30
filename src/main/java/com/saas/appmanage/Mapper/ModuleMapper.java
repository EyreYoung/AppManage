package com.saas.appmanage.Mapper;

import com.saas.appmanage.Entity.Module;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ModuleMapper {

    //根据模块ID删除模块
    @Delete("delete from module where ID = ${module_id}")
    int deleteModuleByID(@Param("module_id") int module_id);

    //模块升级方式完成升级
    @Update("update module set Status = '正常', Version = #{newver} where ID = ${module_id}")
    int updateModuleFinish(@Param("module_id") int module_id,
                        @Param("newver") String newver);

    //根据开发商ID查询升级中模块信息
    @Select("select m.ID as mID,m.Name as mName,m.Intro as mIntro,m.Version as ver,m.Status as mStatus,a.Name as appName,am.Required as mReq from app as a,appmodule as am,module as m where am.AppID = a.ID and am.ModuleID = m.ID and m.Status = '升级中' and a.SVID = ${cpy_id}")
    List<Module> SelectUpdatedModuleByCpyID(@Param("cpy_id") int cpy_id);

    //模块升级方式升级应用
    @Update("update module set Status = '升级中' where Status = '正常' and ID = ${module_id}")
    int updateModule(@Param("module_id") int module_id);

    //根据应用名查询该应用所有模块
    @Select("SELECT mo.ID AS mID,mo.Name AS mName,mo.depen,mo.Version AS ver,mo.Intro AS mIntro,mo.Status AS mStatus FROM (SELECT * FROM module AS m LEFT JOIN (SELECT ModuleID1 AS moid,GROUP_CONCAT( DISTINCT m.Name ) AS depen FROM moduledependence AS md,module AS m WHERE m.ID = md.Depend GROUP BY ModuleID1) AS d ON m.ID = d.moid) AS mo,appmodule AS am,app AS a WHERE mo.ID = am.ModuleID AND a.ID = am.AppID AND a.Name = #{appname} ORDER BY mID")
    List<Module> selectModule(@Param("appname") String appname);

    //插入模块
    @Insert("insert into module(Name,Version,Intro) values(#{mName},#{ver},#{mIntro})")
    @Options(useGeneratedKeys = true, keyProperty = "mID", keyColumn = "ID")
    int insertModule(Module module);

    //插入应用-模块关系
    @Insert("insert into appmodule(AppID,ModuleID,Required) values((select ID from App where Name = #{appname}),#{mid},#{required})")
    int insertAppModule(@Param("appname") String appname,
                        @Param("mid") int mid,
                        @Param("required") String required);

    //插入模块依赖
    @Insert("insert into moduledependence values(#{moduleID1},#{dependID})")
    int insertModuleDependence(@Param("moduleID1") String moduleID1,
                               @Param("dependID") String dependID);

    //根据应ID查询该应用所有模块
    @Select("SELECT mo.ID AS mID,mo.Name AS mName,mo.depen,mo.Version AS ver,mo.Intro AS mIntro,mo.Status AS mStatus,am.Required AS mReq FROM (SELECT * FROM module AS m LEFT JOIN (SELECT ModuleID1 AS moid,GROUP_CONCAT( DISTINCT m.Name ) AS depen FROM moduledependence AS md,module AS m WHERE m.ID = md.Depend GROUP BY ModuleID1) AS d ON m.ID = d.moid) AS mo,appmodule AS am,app AS a WHERE mo.ID = am.ModuleID AND a.ID = am.AppID AND a.ID = ${app_id} ORDER BY mID")
    List<Module> selectModuleByAppID(@Param("app_id") int app_id);
}
