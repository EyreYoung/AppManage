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

    //根据开发商ID查询应用信息
    @Select("select * from app where SVID = #{cpy_id}")
    List<App> SelectAppByCpyID(@Param("cpy_id") int cpyid);

    //查询出所有应用
    @Select("select (@i:=@i+1) as No,a.ID,a.Name,s.Company as SVenderName,regDate,Type,Catagory,Intro,Star,Rec,Version,Status from app as a,(select @i:=0) as it,svender as s where a.SVID = s.ID order by regDate")
    List<App> SelectApp();

    //注册应用基本信息
    @Insert("insert into app(Name,SVID,regDate,Catagory,Intro,Version) values(#{name},(select ID from svender where Company = #{svname}),#{regdate},#{catagory},#{intro},#{version})")
    int insertApp(@Param("name") String name,
                  @Param("svname") String svname,
                  @Param("regdate") String regdate,
                  @Param("catagory") String catagory,
                  @Param("intro") String intro,
                  @Param("version") String version);

    //根据分类查询应用
    @Select("select (@i:=@i+1) as No,a.ID,a.Name,s.Company as SVenderName,regDate,Type,Catagory,Intro,Star,Rec,Version,Status from app as a,(select @i:=0) as it,svender as s where a.SVID = s.ID and a.Catagory = #{catagory} order by regDate")
    List<App> SelectAppByCata(@Param("catagory") String catagory);

    //模糊查询应用（应用名、开发者、应用介绍）
    @Select("select (@i:=@i+1) as No,a.ID,a.Name,s.Company as SVenderName,regDate,Type,Catagory,Intro,Star,Rec,Version,Status from app as a,(select @i:=0) as it,svender as s where a.SVID = s.ID and (a.Name LIKE '%${queryword}%' or a.Intro like '%${queryword}%' or s.Company like '%${queryword}%') order by regDate")
    List<App> SearchApp(@Param("queryword") String queryword);

    //根据应用ID查询应用信息
    @Select("select * from app where ID = #{app_id}")
    App SearchAppByID(@Param("app_id") int appid);
}
