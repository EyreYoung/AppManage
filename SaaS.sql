/*
MySQL Backup
Database: saas
Backup Time: 2018-06-08 22:25:18
*/

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS `saas`.`admin`;
DROP TABLE IF EXISTS `saas`.`app`;
DROP TABLE IF EXISTS `saas`.`appmodule`;
DROP TABLE IF EXISTS `saas`.`authority`;
DROP TABLE IF EXISTS `saas`.`authorityservice`;
DROP TABLE IF EXISTS `saas`.`module`;
DROP TABLE IF EXISTS `saas`.`moduledependence`;
DROP TABLE IF EXISTS `saas`.`moduleservice`;
DROP TABLE IF EXISTS `saas`.`service`;
DROP TABLE IF EXISTS `saas`.`servicedependence`;
DROP TABLE IF EXISTS `saas`.`svender`;
DROP TABLE IF EXISTS `saas`.`user`;
DROP VIEW IF EXISTS `saas`.`appprice`;
DROP VIEW IF EXISTS `saas`.`serviceplus`;
CREATE TABLE `admin` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '管理员ID',
  `Account` varchar(20) NOT NULL COMMENT '管理员账号',
  `Password` varchar(20) NOT NULL COMMENT '管理员密码',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `AdminAccountUnique` (`Account`) USING BTREE COMMENT '管理员账号唯一约束'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
CREATE TABLE `app` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '应用ID',
  `Name` varchar(50) NOT NULL COMMENT '应用名称',
  `SVID` int(11) NOT NULL COMMENT '开发商ID',
  `regDate` date NOT NULL COMMENT '应用注册时间',
  `Type` varchar(10) NOT NULL DEFAULT '按月收费' COMMENT '应用收费方式',
  `Catagory` varchar(20) NOT NULL COMMENT '应用类别',
  `Intro` longtext COMMENT '应用介绍',
  `Star` decimal(2,1) DEFAULT '0.0' COMMENT '应用评分',
  `Rec` varchar(10) NOT NULL DEFAULT '否' COMMENT '是否推荐',
  `Img` varchar(255) DEFAULT NULL COMMENT '应用图片',
  `Version` varchar(50) NOT NULL COMMENT '应用版本',
  `Status` varchar(50) NOT NULL DEFAULT '在售' COMMENT '应用状态：在售/下架/升级中/审核中',
  `Clicks` int(11) NOT NULL DEFAULT '0' COMMENT '点击次数',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `AppNameUnique` (`Name`) USING BTREE,
  KEY `app-svender` (`SVID`),
  CONSTRAINT `app-svender` FOREIGN KEY (`SVID`) REFERENCES `svender` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8;
CREATE TABLE `appmodule` (
  `AppID` int(11) NOT NULL,
  `ModuleID` int(11) NOT NULL,
  `Required` varchar(11) NOT NULL,
  PRIMARY KEY (`AppID`,`ModuleID`),
  KEY `AppModule-Module` (`ModuleID`),
  CONSTRAINT `AppModule-App` FOREIGN KEY (`AppID`) REFERENCES `app` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `AppModule-Module` FOREIGN KEY (`ModuleID`) REFERENCES `module` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `authority` (
  `auth_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '权限ID',
  `app_id` int(11) NOT NULL COMMENT '外键：应用ID',
  `auth_name` varchar(50) NOT NULL COMMENT '权限名',
  `auth_intro` varchar(255) DEFAULT '暂无' COMMENT '权限说明',
  PRIMARY KEY (`auth_id`) USING BTREE,
  KEY `AppAuthority` (`app_id`),
  CONSTRAINT `AppAuthority` FOREIGN KEY (`app_id`) REFERENCES `app` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
CREATE TABLE `authorityservice` (
  `authority_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  PRIMARY KEY (`authority_id`,`service_id`),
  KEY `AuthorityService-Service` (`service_id`),
  CONSTRAINT `AuthorityService-Authority` FOREIGN KEY (`authority_id`) REFERENCES `authority` (`auth_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `AuthorityService-Service` FOREIGN KEY (`service_id`) REFERENCES `service` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `module` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '模块ID',
  `Name` varchar(50) NOT NULL COMMENT '模块名',
  `Intro` varchar(255) DEFAULT '暂无' COMMENT '模块说明',
  `Version` varchar(50) NOT NULL COMMENT '模块版本',
  `Status` varchar(20) NOT NULL DEFAULT '正常' COMMENT '模块状态',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8;
CREATE TABLE `moduledependence` (
  `ModuleID1` int(11) NOT NULL COMMENT '模块ID',
  `Depend` int(11) NOT NULL COMMENT '依赖模块ID',
  PRIMARY KEY (`ModuleID1`,`Depend`),
  KEY `MOduleDep2` (`Depend`),
  CONSTRAINT `MOduleDep2` FOREIGN KEY (`Depend`) REFERENCES `module` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ModuleDep1` FOREIGN KEY (`ModuleID1`) REFERENCES `module` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `moduleservice` (
  `ModuleID` int(11) NOT NULL,
  `ServiceID` int(11) NOT NULL,
  `Required` varchar(10) NOT NULL,
  PRIMARY KEY (`ModuleID`,`ServiceID`),
  KEY `moduleservice-service` (`ServiceID`),
  CONSTRAINT `moduleservice-module` FOREIGN KEY (`ModuleID`) REFERENCES `module` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `moduleservice-service` FOREIGN KEY (`ServiceID`) REFERENCES `service` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `service` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '服务ID',
  `Name` varchar(50) NOT NULL COMMENT '服务名',
  `Intro` varchar(255) DEFAULT '暂无' COMMENT '服务说明',
  `Version` varchar(50) NOT NULL COMMENT '服务版本',
  `Price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '服务价格',
  `Status` varchar(20) NOT NULL DEFAULT '正常' COMMENT '服务状态',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8;
CREATE TABLE `servicedependence` (
  `ServiceID` int(11) NOT NULL COMMENT '服务ID',
  `Depend` int(11) NOT NULL COMMENT '被依赖服务',
  PRIMARY KEY (`ServiceID`,`Depend`),
  KEY `ServiceID2` (`Depend`),
  CONSTRAINT `ServiceID1` FOREIGN KEY (`ServiceID`) REFERENCES `service` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ServiceID2` FOREIGN KEY (`Depend`) REFERENCES `service` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `svender` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '开发商ID',
  `Account` varchar(20) NOT NULL COMMENT '开发商账号名',
  `Password` varchar(20) NOT NULL COMMENT '密码',
  `Company` varchar(50) NOT NULL COMMENT '公司名称',
  `Mail` varchar(50) DEFAULT NULL COMMENT '开发商邮箱',
  `Tel` decimal(11,0) unsigned DEFAULT NULL COMMENT '开发商电话',
  `Status` varchar(20) NOT NULL DEFAULT '正常' COMMENT '开发商状态',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `SVenderAccountUnique` (`Account`),
  UNIQUE KEY `SVenderCompanyUnique` (`Company`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
CREATE TABLE `user` (
  `ID` int(20) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `Account` varchar(20) NOT NULL COMMENT '帐户名',
  `Password` varchar(20) NOT NULL COMMENT '密码',
  `Name` varchar(50) NOT NULL COMMENT '名字',
  `Gender` int(11) DEFAULT '0' COMMENT '性别',
  `Age` int(11) DEFAULT '0' COMMENT '年龄',
  `Email` varchar(50) DEFAULT NULL COMMENT '用户邮箱',
  `Intro` varchar(255) DEFAULT NULL COMMENT '自我介绍',
  `Type` int(10) NOT NULL COMMENT '用户类型',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `UserAccountUnique` (`Account`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `appprice` AS select `a`.`ID` AS `ID`,`a`.`Name` AS `Name`,`a`.`SVID` AS `SVID`,`a`.`regDate` AS `regDate`,`a`.`Type` AS `Type`,`a`.`Catagory` AS `Catagory`,`a`.`Intro` AS `Intro`,`a`.`Star` AS `Star`,`a`.`Rec` AS `Rec`,`a`.`Img` AS `Img`,`a`.`Version` AS `Version`,`a`.`Status` AS `Status`,`a`.`Clicks` AS `Clicks`,ifnull(`p`.`Price`,0) AS `Price` from (`saas`.`app` `a` left join (select `a`.`ID` AS `ID`,`a`.`Name` AS `Name`,sum(`s`.`Price`) AS `Price` from ((((`saas`.`app` `a` join `saas`.`appmodule` `am`) join `saas`.`module` `m`) join `saas`.`moduleservice` `ms`) join `saas`.`service` `s`) where ((`a`.`ID` = `am`.`AppID`) and (`am`.`ModuleID` = `m`.`ID`) and (`m`.`ID` = `ms`.`ModuleID`) and (`ms`.`ServiceID` = `s`.`ID`)) group by `a`.`ID`) `p` on((`a`.`ID` = `p`.`ID`)));
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `serviceplus` AS select `ms`.`ModuleID` AS `mID`,`se`.`ID` AS `sID`,`se`.`NAME` AS `sName`,`se`.`依赖服务` AS `sDepen`,`ms`.`Required` AS `sReq`,`se`.`Version` AS `sVer`,`se`.`Intro` AS `sIntro`,`se`.`Price` AS `sPrice`,`se`.`Status` AS `sStatus` from (`saas`.`moduleservice` `ms` join (select `s`.`ID` AS `ID`,`s`.`Name` AS `NAME`,`de`.`依赖服务` AS `依赖服务`,`s`.`Version` AS `Version`,`s`.`Intro` AS `Intro`,`s`.`Price` AS `Price`,`s`.`Status` AS `Status` from (`saas`.`service` `s` left join (select `sd`.`ServiceID` AS `sID`,group_concat(distinct `s`.`Name` separator ',') AS `依赖服务` from (`saas`.`servicedependence` `sd` join `saas`.`service` `s`) where (`s`.`ID` = `sd`.`Depend`) group by `sd`.`ServiceID`) `de` on((`s`.`ID` = `de`.`sID`)))) `se`) where (`se`.`ID` = `ms`.`ServiceID`);
BEGIN;
LOCK TABLES `saas`.`admin` WRITE;
DELETE FROM `saas`.`admin`;
INSERT INTO `saas`.`admin` (`ID`,`Account`,`Password`) VALUES (1, 'yyd', 'yyd');
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `saas`.`app` WRITE;
DELETE FROM `saas`.`app`;
INSERT INTO `saas`.`app` (`ID`,`Name`,`SVID`,`regDate`,`Type`,`Catagory`,`Intro`,`Star`,`Rec`,`Img`,`Version`,`Status`,`Clicks`) VALUES (1, '交大进销存', 1, '2018-04-01', '按月收费', '销售管理', '暂无', 8.0, '是', NULL, '1.0.0', '下架', 5),(2, '交大教务', 11, '2014-02-03', '按月收费', '协同办公', '暂无', 9.0, '否', NULL, '1.0.1', '下架', 4),(4, '交大人事', 2, '2018-04-05', '按月收费', '人力资源', '暂无', 7.0, '否', NULL, '2.0.0', '在售', 8),(5, '交大财务', 13, '2018-03-06', '按日收费', '财务管理', '暂无', 5.0, '否', NULL, '1.0.2', '下架', 0),(6, '好会计', 13, '2018-03-06', '按月收费', '销售管理', '一个销售管理软件', 0.0, '否', NULL, '1.0.6', '在售', 17),(7, 'HR企业版', 13, '2018-04-24', '按月收费', '人力资源', '这是一个人力资源类软件。', 0.0, '是', NULL, '2.0.0', '在售', 9),(9, '书法字典', 11, '2018-04-24', '按月收费', '文档处理', '这是书法字典', 0.0, '否', NULL, '1.1.0', '下架', 0),(10, '公交查询', 2, '2018-04-25', '按月收费', '便民工具', '一个便民工具', 0.0, '是', NULL, '1.0.0', '在售', 10),(11, '综合办公管理', 10, '2018-04-25', '按月收费', '综合类', '综合办公系统作为一款SaaS在线软件，主要包含：  公文管理、个人事务、会议管理、通知公告、通讯录、日程管理、文档管理、合同管理、在线交流管理、考勤管理、规章制度管理、印章管理、车辆管理、项目管理、销售管理、人事信息管理等功能。\n保障办公管理向规范化、信息化、和谐化发展，融合协同作业、实时通信、业务流程、信息集成、成本管控于一体，为所有员工提供良好的办公手段和沟通协作平台，节约企业成本，提高客户服务质量，整体提高公司办公效率。', 0.0, '是', NULL, '1.0.1', '在售', 53),(12, 'OA免费版', 10, '2018-04-29', '按月收费', '协同办公', '永久免费版OA为小微企业提供最实用，最基本的OA功能。 满足小微企业办公需求。', 0.0, '是', NULL, '1.0.0', '升级中', 4),(18, '三维CAD浏览', 14, '2018-04-29', '按月收费', '3D展示', '该产品属专门为工业设计相关企业推荐的在线3D模型预览工具', 0.0, '否', NULL, '2.1.1', '在售', 1),(19, '机械设计助手', 1, '2018-04-30', '按月收费', '图形图像处理', '机械设计助手由新迪数字工程系统有限公司开发，原常用机械设计工具集的升级版。本软件参照成大先主编的《机械设计手册》第五版的常用计算公式、查询表开发而成。帮助工程师快速完成设计计算工作、确保计算结果的准确性，提高设计效率。', 0.0, '否', NULL, '2.1.1', '升级中', 6),(26, '仿真安卓', 1, '2018-05-01', '按月收费', '设计工具', '仿真工程师可高效开发仿真APP，快速固化仿真经验。仿真APP可供企业设计工程师使用，使用者无需了解任何仿真细节，操作简单，轻松上手。', 0.0, '否', NULL, '1.0.0', '升级中', 5),(27, '工业互联网CServerIOT', 10, '2018-05-01', '按月收费', '数据分析', '工业互联网CServerIOT。', 0.0, '否', NULL, '1.0.0', '在售', 0),(28, '三岩MES', 14, '2018-05-01', '按月收费', '生产制造', '为企业提供从仓储、物流、排产、制造、质量、设备到决策的全方位信息化服务', 0.0, '是', NULL, '2.3.0', '在售', 1),(29, '绩效考核管理', 14, '2018-05-01', '按月收费', '考勤绩效', '帮助企业人事部门对绩效进行科学、透明化管理，运用互联网技术来统计一个部门、个人业绩目标完成情况,以确定其工作绩效和未来发展潜力，为企业领导提供科学决策依据。', 0.0, '否', NULL, '1.0.0', '在售', 1),(30, '永中Office专业办公套件', 2, '2018-05-01', '按月收费', '文档处理', '永中Office专业办公套件，在一套标准用户界面下集成了文字处理，电子表格，简报制作和PDF阅读四大应用。', 0.0, '是', NULL, '4.2.3', '升级中', 1),(32, '毛笔字在线', 1, '2018-05-01', '按月收费', '文档处理', '毛笔字在线，在线输入一行字，整体调整不同书法家的字体，对比选择，保存成图片', 0.0, '是', NULL, '3.0.0', '下架', 1),(36, 'Tempo大数据分析平台', 10, '2018-05-02', '按月收费', '数据展示', '面向企业级用户的一体化大数据分析应用平台', 0.0, '否', NULL, '1.0.2', '升级中', 0),(37, '企查查', 10, '2018-05-02', '按月收费', '数据展示', '企查查是苏州朗动网络科技有限公司旗下的一款企业信用查询工具，可以查到工商注册的所有企业信息，准确无误', 0.0, '是', NULL, '2.1.1', '升级中', 0),(38, '人才各维度测评', 10, '2018-05-02', '按月收费', '人力资源', '性格测试 心理测试 职业测评 人才测评 智商情商 人际交往 恋爱婚姻 校园测评 趣味测试', 0.0, '否', NULL, '1.0.0', '在售', 0),(39, '企业薪资管理', 10, '2018-05-02', '按月收费', '人力资源', '对企业中的工资计算及发放过程进行管理。通过设置工资项目、工资帐套、职工起薪，系统自动计算工资，并完成工资的审批及发放。', 0.0, '是', NULL, '1.0.1', '在售', 2),(40, '旅游产业运行监测', 10, '2018-05-02', '按月收费', '综合类', '实现对旅游景区、旅行社、星级饭店等旅游企业的日常运行状况进行监测，同时还能够结合天气、环保、车辆等相关实时数据进行旅游企业实时运行态势的综合展示与分析研判。', 0.0, '否', NULL, '1.0.0', '在售', 3),(41, 'MD5在线加密', 10, '2018-05-02', '按月收费', '便民工具', 'MD5的典型应用是对一段信息（Message）产生信息摘要（Message-Digest），以防止被篡改。比如，在UNIX下有很多软件在下载的时候都有一个文件名相同，文件扩展名为.md5的文件', 0.0, '否', NULL, '3.0.0', '在售', 3),(42, '在线照片编辑工具', 10, '2018-05-02', '按月收费', '图形图像处理', '在线照片编辑器，可以提供照片内容反向、效果优化等10几种编辑方法，优化照片效果', 0.0, '否', NULL, '1.0.0', '在售', 2),(43, '函数图像绘制工具', 10, '2018-05-02', '按月收费', '图形图像处理', '可帮助您绘制任意给定函数的图像，多个函数分别用不同颜色绘出', 0.0, '是', NULL, '2.1.1', '在售', 4),(44, '顷刻应用', 14, '2018-05-02', '按月收费', '协同办公', '通过便捷的应用制作工具，链接、二维码、公众号推送等社交化分发，满足在线的表单定制和填写。', 0.0, '否', NULL, '1.0.0', '在售', 4),(45, '固定资产管理', 10, '2018-05-02', '按月收费', '协同办公', '适合所有类型的企业。有效解决了固定资产的管理难题，使企业更轻松、有效地管理固定资产。', 0.0, '否', NULL, '2.1.1', '在售', 2),(46, '人工神经网络工具软件', 1, '2018-05-02', '按月收费', '数据分析', '一款免费的人工神经网络工具软件，里面有大量的深度学习模型的JavaScript库（神经网络），在浏览器中可以进行神经网络的训练。不需要安装任何软件、编译器等。学习起来非...', 0.0, '是', NULL, '2.1.1', '在售', 3),(48, 'EasyCAE在线仿真', 10, '2018-05-02', '按月收费', '设计工具', '通过Web浏览器使用户完成前处理设置，计算和后处理设置显示的CAE仿真全过程。目前打通了云计算和超算，使用户能够便捷的使用超算的计算资源。', 0.0, '否', NULL, '1.0.0', '在售', 0),(49, 'SaaS 人事档案管理', 10, '2018-05-02', '按月收费', '人力资源', 'SaaS人事档案系统能够实现资源共享，简化办理流程，在提升工作效率的同时，确保各种数据的权威性和准确性，通过该系统能够大幅提升公司人事管理方面的整体管理水平。', 0.0, '是', NULL, '1.0.0', '在售', 2),(50, 'Creo Parametric', 14, '2018-05-02', '按月收费', '便民工具', 'Creo 是让您能够按照自己的想法（而非按照 CAD 工具的要求）设计产品的一套应用程序。凭借 Creo，您可以使用 2D CAD、3D CAD、参数化建模和直接建模功能创建、分析、查看...', 0.0, '否', NULL, '1.0.0', '在售', 2),(51, 'CAXA PLM协同管理', 14, '2018-05-02', '按月收费', '设计工具', 'CAXA协同管理PLM解决方案将成熟的2D、3D、PDM、CAPP和MES技术整合在统一的协同管理平台基础上，覆盖了从概念设计、详细设计、工艺流程到生产制造的各个环节。', 0.0, '否', NULL, '1.0.0', '在售', 0),(53, 'AutoFeatureCAM', 14, '2018-05-02', '按月收费', '生产制造', 'Autodesk系列产品之 FeatureCAM 。自动化 CAM 编程，快速制造零件', 0.0, '否', NULL, '1.0.0', '在售', 1),(54, '中服SaaS OA中小学版', 10, '2018-05-03', '按月收费', '协同办公', '针对中小学校的信息化管理特点量身打造，实现教师、学生信息的电子化管理；日常办公的流程化、规范化；实现公文的自动流转、群阅、会签等公文管理的流程化。', 0.0, '否', NULL, '1.0.0', '在售', 2),(58, '中服SaaS OA高校版', 10, '2018-05-03', '按月收费', '协同办公', '高校版OA是数字校园信息化的标配，实现日常办公的流程化、规范化。实现公文的自动流转、群阅、会签等公文管理的流程化，提高公文流程过程中的效益，缩短流转周期。', 0.0, '否', NULL, '1.0.0', '在售', 2),(59, 'eNORM 3DAST', 10, '2018-05-03', '按月收费', '3D展示', '借助于虚拟仿真技术等人机交互手段，规划仿真产品设计装配过程，以指导现场生产，抓住客户眼球，推进产品碎片化推广。', 0.0, '否', NULL, '1.0.0', '在售', 5),(60, '3DS MAX', 10, '2018-05-03', '按月收费', '3D展示', '借助 3ds Max 三维建模和渲染软件，可以创造宏伟的游戏世界，布置精彩绝伦的场景以实现设计可视化，并创建细致入微的角色。', 0.0, '否', NULL, '1.0.0', '在售', 1),(61, '有道在线翻译', 10, '2018-05-03', '按月收费', '文档处理', '提供各种语言的在线翻译服务', 0.0, '否', NULL, '1.0.0', '在售', 1),(63, '测试应用', 1, '2018-05-12', '按月收费', '考勤绩效', '', 0.0, '否', NULL, '1.0.0', '在售', 2),(66, '测试应用2', 10, '2018-05-14', '按月收费', '协同办公', '', 0.0, '否', NULL, '1.0.0', '在售', 3),(77, '交大CRM管理系统', 23, '2018-05-31', '按月收费', '人力资源', '', 0.0, '否', NULL, '1.0.1', '在售', 1);
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `saas`.`appmodule` WRITE;
DELETE FROM `saas`.`appmodule`;
INSERT INTO `saas`.`appmodule` (`AppID`,`ModuleID`,`Required`) VALUES (4, 2, '否'),(4, 3, '是'),(4, 4, '否'),(4, 5, '是'),(4, 9, '否'),(11, 5, '否'),(11, 6, '否'),(11, 64, '否'),(11, 66, '否'),(53, 1, '否'),(53, 8, '否'),(63, 48, '否'),(66, 50, '否'),(66, 51, '否'),(66, 52, '否'),(77, 71, '否'),(77, 72, '否');
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `saas`.`authority` WRITE;
DELETE FROM `saas`.`authority`;
INSERT INTO `saas`.`authority` (`auth_id`,`app_id`,`auth_name`,`auth_intro`) VALUES (2, 63, '测试权限', '暂无'),(4, 66, '测试权限', ''),(14, 11, '行政文章管理', ''),(15, 11, '个人信息管理', '对个人的信息进行管理。'),(16, 11, '人员工作监督', ''),(17, 11, '请假管理', ''),(18, 11, '出差管理', ''),(19, 11, '通讯录管理', ''),(20, 11, '会议管理', ''),(21, 11, '人员档案管理', ''),(22, 11, '人员工资管理', ''),(23, 11, '人事合同管理', ''),(30, 77, '基本信息查看', ''),(31, 77, '操作客户信息', ''),(32, 77, '操作供应商信息', '');
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `saas`.`authorityservice` WRITE;
DELETE FROM `saas`.`authorityservice`;
INSERT INTO `saas`.`authorityservice` (`authority_id`,`service_id`) VALUES (14, 87),(14, 88),(16, 89),(16, 90),(17, 91),(17, 92),(18, 93),(18, 94),(19, 95),(19, 96),(19, 97),(15, 98),(20, 99),(20, 100),(21, 101),(21, 102),(22, 103),(23, 103),(23, 104),(23, 105),(15, 106),(15, 107),(15, 108),(31, 111),(31, 112),(30, 113),(30, 114),(31, 114);
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `saas`.`module` WRITE;
DELETE FROM `saas`.`module`;
INSERT INTO `saas`.`module` (`ID`,`Name`,`Intro`,`Version`,`Status`) VALUES (1, '个人事务', '暂无', '1.0.0', '正常'),(2, '销售管理', '暂无', '1.0.0', '正常'),(3, '人事管理', '暂无', '1.0.0', '正常'),(4, '信息发布', '暂无', '1.0.0', '正常'),(5, '行政办公', '暂无', '1.0.0', '升级中'),(6, '日常办公', '暂无', '1.0.0', '正常'),(7, '辅助办公', '暂无', '1.0.0', '正常'),(8, '人员信息', '暂无', '1.0.0', '正常'),(9, '智能设计', '暂无', '1.0.0', '正常'),(48, '测试模块1', '测试模块应用说明', '1.0.0', '正常'),(49, '测试模块1', '测我是模块的说明', '1.0.0', '正常'),(50, '测试模块1', '', '1.0.0', '正常'),(51, '测试模块2', '', '1.0.0', '正常'),(52, '测试模块3', '', '1.0.0', '正常'),(53, '测试模块1', '', '1.0.0', '正常'),(54, '测试模块2', '', '1.0.0', '正常'),(55, '测试模块1', '', '1.0.0', '正常'),(56, '超级测试模块1', '超级测试模块1', '1.0.0', '正常'),(57, '超级测试模块2', '超级测试模块2', '1.0.0', '正常'),(58, '超级测试模块3', '超级测试模块3', '1.0.1', '正常'),(59, '测试模块1', '', '1.0.0', '正常'),(60, '测试模块2', '', '1.0.0', '正常'),(61, '测试模块2', '', '1.0.0', '正常'),(62, '测试模块1', '', '1.0.0', '正常'),(63, '测试模块2', '', '1.0.0', '正常'),(64, '辅助办公', '包括规章制度、知识管理、通讯录等功能。', '1.0.1', '正常'),(66, '人事管理', '包含人员档案管理、人事合同管理、人员工资管理等功能。', '1.0.0', '正常'),(67, '客户信息管理', '该模块用于管理客户信息。', '1.0.0', '正常'),(68, '供应商管理', '该模块用于管理供应商信息。', '1.0.0', '正常'),(69, '客户信息管理', '', '1.0.0', '正常'),(70, '供应商管理', '', '1.0.0', '正常'),(71, '客户信息管理', '', '1.0.0', '正常'),(72, '供应商信息管理', '', '1.0.0', '正常');
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `saas`.`moduledependence` WRITE;
DELETE FROM `saas`.`moduledependence`;
INSERT INTO `saas`.`moduledependence` (`ModuleID1`,`Depend`) VALUES (2, 1),(3, 1),(2, 4),(66, 5),(64, 6),(51, 50),(52, 51),(54, 53),(57, 56),(58, 56),(61, 60),(63, 62);
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `saas`.`moduleservice` WRITE;
DELETE FROM `saas`.`moduleservice`;
INSERT INTO `saas`.`moduleservice` (`ModuleID`,`ServiceID`,`Required`) VALUES (1, 106, '否'),(1, 107, '否'),(1, 108, '否'),(5, 87, '是'),(5, 88, '否'),(5, 89, '否'),(5, 90, '否'),(6, 91, '否'),(6, 92, '否'),(6, 93, '否'),(6, 94, '否'),(49, 74, '否'),(54, 75, '否'),(55, 76, '否'),(56, 77, '否'),(56, 78, '否'),(57, 79, '否'),(57, 80, '是'),(58, 81, '否'),(62, 82, '否'),(64, 95, '是'),(64, 96, '否'),(64, 97, '否'),(64, 98, '是'),(64, 99, '否'),(64, 100, '否'),(66, 101, '否'),(66, 102, '否'),(66, 103, '否'),(66, 104, '否'),(66, 105, '否'),(69, 109, '否'),(69, 110, '否'),(71, 111, '否'),(71, 112, '否'),(72, 113, '否'),(72, 114, '否');
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `saas`.`service` WRITE;
DELETE FROM `saas`.`service`;
INSERT INTO `saas`.`service` (`ID`,`Name`,`Intro`,`Version`,`Price`,`Status`) VALUES (60, '测试服务2', '暂无', '1.0.0', 0.00, '正常'),(74, '测试服务2', '测试服务的说明', '1.0.0', 0.00, '正常'),(75, '测试服务2', '', '1.0.1', 0.00, '正常'),(76, '测试服务2', '', '1.0.0', 6.00, '正常'),(77, '超级测试服务1', '这是价值10元的超级测试服务1', '1.0.1', 10.00, '正常'),(78, '超级测试服务2', '这是价值11元的超级测试服务2', '1.0.0', 11.00, '正常'),(79, '超级测试服务3', '这是价值13元的超级测试服务3', '1.0.0', 12.00, '正常'),(80, '超级测试服务4', '这是价值13元的超级测试服务4', '1.0.0', 13.00, '正常'),(81, '测试服务2', '', '1.0.0', 2.00, '正常'),(82, '测试服务22', '', '1.0.0', 22.00, '正常'),(87, '行政文章查看', '查看行政文章。', '1.0.0', 10.00, '正常'),(88, '行政文章发布', '发布行政文章。', '1.0.0', 15.00, '正常'),(89, '查看人员工作', '', '1.0.0', 10.00, '正常'),(90, '人员工作审批', '对员工工作进行审批。', '1.0.0', 10.00, '正常'),(91, '请假审核', '对员工请假申请进行审核。', '1.0.0', 10.00, '正常'),(92, '请假批准', '', '1.0.0', 15.00, '正常'),(93, '出差请求审核', '对出差工作进行审核。', '1.0.0', 5.00, '正常'),(94, '出差批准', '对出差工作进行批复。', '1.0.0', 10.00, '正常'),(95, '通讯录增加记录', '', '1.0.0', 10.00, '正常'),(96, '通讯录删除记录', '', '1.0.0', 10.00, '正常'),(97, '通讯录修改记录', '', '1.0.0', 10.00, '正常'),(98, '查看会议', '', '1.0.1', 10.00, '正常'),(99, '发布会议要求', '', '1.0.0', 10.00, '升级中'),(100, '修改会议要求', '', '1.0.0', 10.00, '正常'),(101, '调入人员档案', '', '1.0.0', 10.00, '正常'),(102, '调出人员档案', '', '1.0.0', 10.00, '正常'),(103, '修改人员工资', '', '1.0.0', 10.00, '正常'),(104, '审核人事合同', '', '1.0.0', 10.00, '正常'),(105, '签订人事合同', '', '1.0.0', 10.00, '正常'),(106, '查看个人信息', '', '1.0.0', 5.00, '正常'),(107, '修改个人信息', '', '1.0.0', 5.00, '正常'),(108, '删除个人信息', '', '1.0.0', 10.00, '正常'),(109, '查看客户信息', '', '1.0.0', 10.00, '正常'),(110, '添加客户信息', '', '1.0.0', 10.00, '正常'),(111, '查看客户信息', '', '1.0.0', 10.00, '正常'),(112, '添加客户信息', '', '1.0.0', 10.00, '正常'),(113, '查看供应商', '', '1.0.0', 10.00, '正常'),(114, '添加供应商信息', '', '1.0.0', 10.00, '正常');
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `saas`.`servicedependence` WRITE;
DELETE FROM `saas`.`servicedependence`;
INSERT INTO `saas`.`servicedependence` (`ServiceID`,`Depend`) VALUES (78, 77),(88, 87),(90, 89),(94, 93),(99, 98),(100, 98),(105, 104),(107, 106),(108, 106),(110, 109),(112, 111),(114, 113);
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `saas`.`svender` WRITE;
DELETE FROM `saas`.`svender`;
INSERT INTO `saas`.`svender` (`ID`,`Account`,`Password`,`Company`,`Mail`,`Tel`,`Status`) VALUES (1, 'tes', '123', 'swjtu1', 'swjt@qq.com', 100, '正常'),(2, 'test', '123', 'swjtu2', 'swjtu@qq.com', 12, '正常'),(10, 'rest', '111111', '交大软件公司', 'swjtu@qq.com', 123456, '正常'),(11, 'qqq', 'qqq', 'swjtu4', 'swjtu@qq.com', 112, '正常'),(13, 'admin1', '123', 'swjtu5', 'swjtu@swjtu.edu.cn', 12580, '正常'),(14, 'cpy1', '123', '华天软件', 'swjtu@swjtu.edu.cn', 112, '正常'),(15, 'test1', '123', '测试开发商', 'swjtu@swjtu.edu.cn', 12580, '正常'),(16, 'test2', '123', '测试开发商2', 'swjtu@qq.com', 12580, '正常'),(18, 'qqq1', '123', '交大代理', 'swjtu@my.swjtu.edu.cn', 123, '注册审核中'),(23, 'swjtutest', '123456', '西南交通大学应用服务公司', 'swjtu@swjtu.edu.cn', 12356, '正常');
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `saas`.`user` WRITE;
DELETE FROM `saas`.`user`;
INSERT INTO `saas`.`user` (`ID`,`Account`,`Password`,`Name`,`Gender`,`Age`,`Email`,`Intro`,`Type`) VALUES (1, '', '', 'yyd', 1, 22, NULL, NULL, 1);
UNLOCK TABLES;
COMMIT;
