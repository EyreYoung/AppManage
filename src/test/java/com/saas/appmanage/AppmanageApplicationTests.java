package com.saas.appmanage;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AppmanageApplicationTests {

	@Autowired
	private UserMapper userMapper;


	@Test
    @Rollback
	public void findByName() throws Exception {
	    User u = userMapper.findByName("yyd");
        Assert.assertEquals(22,u.getAge());
	}

}
