package com.saas.appmanage.Mapper;

import com.saas.appmanage.Entity.Module;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ModuleMapper {
    @Select("SELECT mo.ID AS mID,mo.Name AS mName,mo.depen,mo.Version AS ver FROM (SELECT * FROM module AS m LEFT JOIN (SELECT ModuleID1 AS moid,GROUP_CONCAT( DISTINCT m.Name ) AS depen FROM moduledependence AS md,module AS m WHERE m.ID = md.Depend GROUP BY ModuleID1) AS d ON m.ID = d.moid) AS mo,appmodule AS am,app AS a WHERE mo.ID = am.ModuleID AND a.ID = am.AppID AND a.Name = #{appname} ORDER BY mID")
    List<Module> selectModule(@Param("appname") String appname);

    @Insert("insert into module(Name,Version) values(#{name},#{ver})")
    int insertModule(@Param("name") String name,
                     @Param("ver") String ver);
}
