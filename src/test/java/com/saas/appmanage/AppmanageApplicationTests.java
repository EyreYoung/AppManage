package com.saas.appmanage;

import com.saas.appmanage.Entity.Admin;
import com.saas.appmanage.Mapper.AdminMapper;
import com.saas.appmanage.Mapper.UserMapper;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AppmanageApplicationTests {

	@Autowired
	private UserMapper userMapper;
	@Autowired
	private AdminMapper adminMapper;

	@Test
    @Rollback
//	public void findByName() throws Exception {
//	    User u = userMapper.findByName("yyd");
//        Assert.assertEquals(22,u.getAge());
//	}

	public void findPwdByAccount() throws Exception {
		Admin a = adminMapper.findByAccount("yyd");
		Assert.assertEquals("yyd",a.getPassword());
	}

}
