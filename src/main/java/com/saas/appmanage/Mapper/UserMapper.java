package com.saas.appmanage.Mapper;

import com.saas.appmanage.Entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {
    @Select("select * from user where Name = #{Name}")
    User findByName(@Param("Name") String Name);
}
