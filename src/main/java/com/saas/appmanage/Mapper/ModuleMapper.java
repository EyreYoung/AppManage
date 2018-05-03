package com.saas.appmanage.Mapper;

import com.saas.appmanage.Entity.Module;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ModuleMapper {
    @Select("SELECT mo.ID AS mID,mo.Name AS mName,mo.depen,mo.Version AS ver FROM (SELECT * FROM module AS m LEFT JOIN (SELECT ModuleID1 AS moid,GROUP_CONCAT( DISTINCT m.Name ) AS depen FROM moduledependence AS md,module AS m WHERE m.ID = md.Depend GROUP BY ModuleID1) AS d ON m.ID = d.moid) AS mo,appmodule AS am,app AS a WHERE mo.ID = am.ModuleID AND a.ID = am.AppID AND a.Name = #{appname} ORDER BY mID")
    List<Module> selectModule(@Param("appname") String appname);

    @Insert("insert into module(Name,Version) values(#{mName},#{ver})")
    @Options(useGeneratedKeys = true, keyProperty = "mID", keyColumn = "ID")
    int insertModule(Module module);

    @Insert("insert into appmodule(AppID,ModuleID,Required) values((select ID from App where Name = #{appname}),#{mid},#{required})")
    int insertAppModule(@Param("appname") String appname,
                        @Param("mid") int mid,
                        @Param("required") String required);

    //插入模块依赖
    @Insert("insert into moduledependence values(#{moduleID1},#{dependID})")
    int insertModuleDependence(@Param("moduleID1") String moduleID1,
                               @Param("dependID") String dependID);
}
