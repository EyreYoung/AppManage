package com.saas.appmanage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
//@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})//暂时不配置数据源
public class AppmanageApplication {
	public static void main(String[] args) {
		SpringApplication.run(AppmanageApplication.class, args);
	}
}
