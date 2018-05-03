package com.saas.appmanage.Mapper;


import com.saas.appmanage.Entity.SVender;
import org.apache.ibatis.annotations.*;

import java.util.Date;
import java.util.List;

@Mapper
public interface SVenderMapper {
    @Insert("insert into svender(Account,Password,Company,Mail,Tel) values(#{account},#{password},#{company},#{mail},#{tel})")
    @Options(useGeneratedKeys = true, keyProperty = "ID", keyColumn = "ID")
    int insertSVender (@Param("account") String account,
                       @Param("password") String password,
                       @Param("company") String company,
                       @Param("mail") String mail,
                       @Param("tel") String tel);


    @Select("select id from svender where Account = #{account} and Password = #{password}")
    int findCpy (@Param("account") String account,
                 @Param("password") String password);

    @Select("select * from svender")
    List<SVender> queryCpys();

    @Select("select Company from svender where ID = #{id}")
    String findCpyByID(@Param("id") int id);
}
