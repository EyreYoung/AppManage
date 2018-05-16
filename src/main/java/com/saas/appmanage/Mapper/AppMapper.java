package com.saas.appmanage.Mapper;

import com.saas.appmanage.Entity.App;
import org.apache.ibatis.annotations.*;

import java.util.Date;
import java.util.List;

@Mapper
public interface AppMapper {

    //查出同类型应用并按热度排行
    @Select("select * from app where Catagory=(select Catagory from app where ID = ${app_id})and ID != ${app_id} ORDER BY Clicks DESC")
    List<App> SelectRelaAppByID(@Param("app_id") int app_id);

    //进入应用详情界面将应用Clicks自加1
    @Update("update app set Clicks = Clicks + 1 where ID = ${app_id}")
    int updateAppClicks(@Param("app_id") int app_id);

    //根据开发商ID查询应用信息
    @Select("select * from app where SVID = #{cpy_id}")
    List<App> SelectAppByCpyID(@Param("cpy_id") int cpyid);

    //查询出所有应用
    @Select("select (@i:=@i+1) as No,a.ID,a.Name,s.Company as SVenderName,regDate,Type,Catagory,Intro,Star,Rec,Version,Status,Clicks from app as a,(select @i:=0) as it,svender as s where a.SVID = s.ID order by regDate")
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
    @Select("select (@i:=@i+1) as No,a.ID,a.Name,s.Company as SVenderName,regDate,Type,Catagory,Intro,Star,Rec,Version,Status,Clicks from app as a,(select @i:=0) as it,svender as s where a.SVID = s.ID and a.Catagory = #{catagory} order by regDate")
    List<App> SelectAppByCata(@Param("catagory") String catagory);

    //模糊查询应用（应用名、开发者、应用介绍）
    @Select("select (@i:=@i+1) as No,a.ID,a.Name,s.Company as SVenderName,regDate,Type,Catagory,Intro,Star,Rec,Version,Status,Clicks from app as a,(select @i:=0) as it,svender as s where a.SVID = s.ID and (a.Name LIKE '%${queryword}%' or a.Intro like '%${queryword}%' or s.Company like '%${queryword}%') order by regDate")
    List<App> SearchApp(@Param("queryword") String queryword);

    //根据应用ID查询应用信息
    @Select("select * from app where ID = #{app_id}")
    App SearchAppByID(@Param("app_id") int appid);

    //应用下架
    @Update("update app set Status = '下架' where ID = ${app_id} and Status = '在售'")
    int dropAppByID(@Param("app_id") int appid);

    //删除应用
    @Delete("delete from app where ID = ${app_id}")
    int deleteAppByID(@Param("app_id") int appid);

    //修改应用
    @Update("update app set Name = #{newname} , Catagory = #{newcata} , Intro = #{newintro} where ID = ${app_id}")
    int updateAppByID(@Param("newname") String newname,
                      @Param("newcata") String newcata,
                      @Param("newintro") String newintro,
                      @Param("app_id") int appid);
}
