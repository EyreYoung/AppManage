package com.saas.appmanage.Mapper;

import com.saas.appmanage.Entity.Authority;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface AuthorityMapper {

    //根据App_Name查询所有权限
    @Select("select auth_id,app.Name as app_name,auth_name from authority as au,app where app_id = app.ID and app.Name = #{appname}")
    List<Authority> selectAuthority(@Param("appname") String appname);

    //插入权限
    @Insert("insert into authority(app_id,auth_name) values((select ID from app where Name = #{app_name}),#{auth_name})")
    @Options(useGeneratedKeys = true, keyProperty = "auth_id", keyColumn = "auth_id")
    int insertAuthority(Authority authority);
}
