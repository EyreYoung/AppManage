package com.saas.appmanage.Mapper;

import com.saas.appmanage.Entity.Authority;
import com.saas.appmanage.Entity.minAuth;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface AuthorityMapper {

    //根据权限ID删除权限
    @Delete("delete from authority where auth_id = ${auth_id}")
    int deleteAuthorityByID(@Param("auth_id") int auth_id);

    //根据应用ID查询所有权限
    @Select("select auth_id,auth_name,auth_intro from authority as au where au.app_id = ${app_id}")
    List<minAuth> selectAuthorityByAppID(@Param("app_id") int app_id);

    //根据App_Name查询所有权限
    @Select("select auth_id,app.Name as app_name,auth_name,auth_intro from authority as au,app where app_id = app.ID and app.Name = #{appname}")
    List<Authority> selectAuthority(@Param("appname") String appname);

    //插入权限
    @Insert("insert into authority(app_id,auth_name,auth_intro) values((select ID from app where Name = #{app_name}),#{auth_name},#{auth_intro})")
    @Options(useGeneratedKeys = true, keyProperty = "auth_id", keyColumn = "auth_id")
    int insertAuthority(Authority authority);

    //插入服务-权限关系
    @Insert("insert into authorityservice(authority_id,service_id) values (${auth_id},${ser_id})")
    int insertAuthorityService(@Param("auth_id") int auth_id,
                               @Param("ser_id") int ser_id);

    //根据服务ID查询需要权限
    @Select("select auth_id,auth_name,auth_intro from authority as a,authorityservice as s where a.auth_id = s.authority_id and s.service_id = ${service_id}")
    List<minAuth> selectAuthByServiceID(@Param("service_id") int service_id);
}
