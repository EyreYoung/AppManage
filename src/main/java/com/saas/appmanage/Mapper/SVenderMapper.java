package com.saas.appmanage.Mapper;


import com.saas.appmanage.Entity.SVender;
import org.apache.ibatis.annotations.*;

import java.util.Date;
import java.util.List;

@Mapper
public interface SVenderMapper {

    //开发商注册审核通过
    @Update("update svender set Status = '正常' where ID = ${cpy_id} and Status = '注册审核中'")
    int passRegCpy(@Param("cpy_id") int cpy_id);

    //开发商注册审核不通过
    @Update("update svender set Status = '注册失败' where ID = ${cpy_id} and Status = '注册审核中'")
    int unpassRegCpy(@Param("cpy_id") int cpy_id);

    //查询所有待审核的注册开发商
    @Select("select * from svender where Status = '注册审核中'")
    List<SVender> queryRegCpys();

    //根据ID修改开发商信息
    @Update("update svender set Password = #{password}, Company = #{company}, Tel = #{tel}, Mail = #{mail} where ID = ${cpy_id}")
    int updateCpyByID(@Param("password") String password,
                      @Param("company") String company,
                      @Param("tel") String tel,
                      @Param("mail") String mail,
                      @Param("cpy_id") int cpy_id);

    //根据应用ID查询开发商信息
    @Select("select s.ID,s.Account,s.Password,s.Company,s.Mail,s.Tel from app as a,svender as s where a.SVID = s.ID and a.ID = #{app_id}")
    SVender selectSVenderByAppid(@Param("app_id") int appid);

    //插入开发商信息
    @Insert("insert into svender(Account,Password,Company,Mail,Tel,Status) values(#{account},#{password},#{company},#{mail},#{tel},'注册审核中')")
    @Options(useGeneratedKeys = true, keyProperty = "ID", keyColumn = "ID")
    int insertSVender (@Param("account") String account,
                       @Param("password") String password,
                       @Param("company") String company,
                       @Param("mail") String mail,
                       @Param("tel") String tel);

    //开发商登录验证
    @Select("select id from svender where Account = #{account} and Password = #{password}")
    int findCpy (@Param("account") String account,
                 @Param("password") String password);

    //查询所有开发商
    @Select("select * from svender")
    List<SVender> queryCpys();

    //根据ID查开发商名
    @Select("select * from svender where ID = ${id}")
    List<SVender> findCpyByID(@Param("id") int id);
}
