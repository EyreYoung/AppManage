package com.saas.appmanage;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {
    @Select("select * from user where Name = #{Name}")
    User findByName(@Param("Name") String Name);
}
