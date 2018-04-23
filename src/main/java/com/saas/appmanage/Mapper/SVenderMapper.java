package com.saas.appmanage.Mapper;


import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;

import java.util.Date;

@Mapper
public interface SVenderMapper {
    @Insert("insert into svender(Account,Password,Company,Mail,Tel) values(#{account},#{password},#{company},#{mail},#{tel})")
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "ID")
    int insertSVender (@Param("account") String account,
                       @Param("password") String password,
                       @Param("company") String company,
                       @Param("mail") String mail,
                       @Param("tel") String tel);
}
