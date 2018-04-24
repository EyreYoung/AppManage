package com.saas.appmanage.Mapper;

import com.saas.appmanage.Entity.App;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.Date;
import java.util.List;

@Mapper
public interface AppMapper {
    @Select("select a.Name,s.Company as SVenderName,regDate,Type,Catagory,Intro,Star,Rec,Version from app as a,svender as s where a.SVID = s.ID")
    List<App> SelectApp();

    @Insert("insert into app(Name,SVID,regDate,Catagory,Intro,Version) values(#{name},(select ID from svender where Company = #{svname}),#{regdate},#{catagory},#{intro},#{version})")
    int insertApp(@Param("name") String name,
                  @Param("svname") String svname,
                  @Param("regdate") String regdate,
                  @Param("catagory") String catagory,
                  @Param("intro") String intro,
                  @Param("version") String version);
}
