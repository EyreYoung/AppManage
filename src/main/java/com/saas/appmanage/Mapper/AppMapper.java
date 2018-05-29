package com.saas.appmanage.Mapper;

import com.saas.appmanage.Entity.App;
import org.apache.ibatis.annotations.*;

import java.util.Date;
import java.util.List;

@Mapper
public interface AppMapper {

    //按热度排序应用
    @Select("SELECT ap.*,s.Company as SVenderName FROM appprice as ap,svender as s where ap.SVID = s.ID AND ap.Status = '在售' order by Clicks desc")
    List<App> queryHotApps();

    //查询所有推荐应用
    @Select("SELECT ap.*,s.Company as SVenderName FROM appprice as ap,svender as s where ap.SVID = s.ID AND ap.Status = '在售' AND ap.Rec = '是'")
    List<App> queryRecApps();

    //应用设为推荐
    @Update("update app set Rec = '是' where ID = ${app_id} and Rec = '否'")
    int recommendApp(@Param("app_id") int app_id);

    //应用取消推荐
    @Update("update app set Rec = '否' where ID = ${app_id} and Rec = '是'")
    int unrecommendApp(@Param("app_id") int app_id);

    //应用注册审核通过
    @Update("update app set Status = '在售' where Status = '审核中' and ID = ${app_id}")
    int passRegApp(@Param("app_id") int app_id);

    //应用注册审核通过
    @Update("update app set Status = '审核未通过' where Status = '审核中' and ID = ${app_id}")
    int unpassRegApp(@Param("app_id") int app_id);

    //查询注册审核中的应用
    @Select("SELECT ap.*,s.Company as SVenderName FROM appprice as ap,svender as s where ap.SVID = s.ID AND ap.Status = '审核中'")
    List<App> queryRegApps();

    //根据开发商ID查询升级中应用信息
    @Select("select * from app where SVID = ${cpy_id} and Status = '升级中'")
    List<App> SelectUpdatedAppByCpyID(@Param("cpy_id") int cpy_id);

    //应用升级方式完成升级
    @Update("update app set Status = '在售', Version = #{newver} where Name = #{appname}")
    int updateAppFinish(@Param("appname") String appname,
                        @Param("newver") String newver);

    //应用升级方式升级应用
    @Update("update app set Status = '升级中' where Name = #{appname}")
    int updateApp(@Param("appname") String appname);

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
    @Select("SELECT ap.*,s.Company as SVenderName FROM appprice as ap,svender as s where ap.SVID = s.ID")
    List<App> SelectApp();

//    //注册应用基本信息
//    @Insert("insert into app(Name,SVID,regDate,Catagory,Intro,Version,Status) values(#{name},(select ID from svender where Company = #{svname}),#{regdate},#{catagory},#{intro},#{version},'审核中')")
//    int insertApp(@Param("name") String name,
//                  @Param("svname") String svname,
//                  @Param("regdate") String regdate,
//                  @Param("catagory") String catagory,
//                  @Param("intro") String intro,
//                  @Param("version") String version);

    //注册应用基本信息
    @Insert("insert into app(Name,SVID,regDate,Catagory,Intro,Version,Status) values(#{Name},(select ID from svender where Company = #{SVenderName}),#{regDate},#{Catagory},#{Intro},#{Version},#{Status})")
    @Options(useGeneratedKeys = true, keyProperty = "ID", keyColumn = "ID")
    int insertApp(App app);

    //根据分类查询应用
    @Select("select (@i:=@i+1) as No,a.ID,a.Name,s.Company as SVenderName,regDate,Type,Catagory,Intro,Star,Rec,Version,a.Status,Clicks from app as a,(select @i:=0) as it,svender as s where a.SVID = s.ID and a.Catagory = #{catagory} and a.Status = '在售' order by regDate")
    List<App> SelectAppByCata(@Param("catagory") String catagory);

    //模糊查询应用（应用名、开发者、应用介绍）
    @Select("select (@i:=@i+1) as No,a.ID,a.Name,s.Company as SVenderName,regDate,Type,Catagory,Intro,Star,Rec,Version,a.Status,Clicks from app as a,(select @i:=0) as it,svender as s where a.SVID = s.ID and a.Status = '在售' and (a.Name LIKE '%${queryword}%' or a.Intro like '%${queryword}%' or s.Company like '%${queryword}%') order by regDate")
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
