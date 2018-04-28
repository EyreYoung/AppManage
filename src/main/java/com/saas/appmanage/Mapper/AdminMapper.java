package com.saas.appmanage.Mapper;

import com.saas.appmanage.Entity.Admin;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface  AdminMapper {
    @Select("select * from admin where Account = #{Account}")
    Admin findByAccount(@Param("Account") String Account);

    @Select("select * from admin")
    List<Admin> queryAdmins();

    @Select("select count(*) from admin where Account = #{account} and Password = #{password}")
    int findAdmin(@Param("account") String account,
                  @Param("password") String password);

}
