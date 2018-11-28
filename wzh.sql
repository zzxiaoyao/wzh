SET NAMES UTF8;
DROP DATABASE IF EXISTS wzh;
CREATE DATABASE wzh CHARSET=UTF8;
USE wzh;
#创建用户表
CREATE TABLE wzh_user(
	uid INT PRIMARY KEY AUTO_INCREMENT,
	uname VARCHAR(8),
	upwd VARCHAR(16),
	sex BOOL,
	email VARCHAR(20),
	portrait VARCHAR(128),
	intro VARCHAR(128)
);
INSERT INTO wzh_user VALUES(null,'zzxy','zzxy1109','0','1325756284@qq.com','/image/user/1.png','这个人很懒，什么都没写');
#创建视频列表
CREATE TABLE wzh_video(
	vid INT PRIMARY KEY AUTO_INCREMENT,
	vname VARCHAR(32),
	cover VARCHAR(128),
	intro VARCHAR(128),
	url VARCHAR(128)
);
INSERT INTO wzh_video VALUES(NULL,'稀神探女的灾难','/image/video/1.png','稀神探女的灾难(第六集)','/video/1.mp4');