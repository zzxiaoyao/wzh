//用户路由器
//导入连接池
const pool=require('../pool.js');
const express=require('express');
var router=express.Router();
//添加路由
//用户注册
router.post('/register',(req,res)=>{
	var obj=req.body
	var $uname=obj.uname;
	var $upwd=obj.upwd;
	var $email=obj.email;
	if(!$uname){
		res.send({code:"301",msg:"uname required"});
		return;
	};
	if(!$upwd){
		res.send({code:"302",msg:"upwd required"});
		return;
	};
	if(!$email){
		res.send({code:"303",msg:"email required"});
		return;
	};
	var intro="这个人很懒，什么都没有写"
	pool.query('INSERT INTO wzh_user VALUES(NULL,?,?,NULL,?,0,?)',[$uname,$upwd,$email,intro],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send("1");
		};
	});
});
//用户登录
router.post('/login',(req,res)=>{
	var obj=req.body;
	var $uname=obj.uname;
	var $upwd=obj.upwd;
	if(!$uname){
		res.send({code:"401",msg:"uanme required"});
		return;
	}else if(!$upwd){
		res.send({code:"402",mas:"upwd required"});
		return;
	};
	pool.query('SELECT * FROM wzh_user WHERE uname=? AND upwd=?',[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send({code:200,msg:'reg success'});
		}else{
			res.send({code:301,msg:'login error'});
		};
	});
});
//修改用户信息
router.post('/update',(req,res)=>{
	var obj=req.body;
	var i=400;
	for(var key in obj){
		i++;
		if(!obj[key]){
			res.send({code:i,msg:key+" required"});
			return;
		};	
	};
	var $uid=obj.uid;
	var $upwd=obj.upwd;
	var $email=obj.email;
	var $portrait="/image/user/";
	$portrait+=obj.portrait;
	var $intro=obj.intro;
	console.log(obj);
	pool.query("UPDATE wzh_user SET upwd=?,email=?,portrait=?,intro=? WHERE uid=?",[$upwd,$email,$portrait,$intro,$uid],(err,result)=>{
		console.log(result);
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({coed:200,msg:"reg success"});
		}else{
			res.send({code:301,msg:"update error"})
		};
	});
});
//检索用户
router.get("/detail",(req,res)=>{
	var obj=req.query;
	var $uid=obj.uid;
	if(!$uid){
		res.send({code:401,msg:"uid required"});
		return;
	};
	pool.query("SELECT * FROM wzh_user WHERE uid=?",[$uid],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send(result);
		}else{
			res.send({code:301,msg:"detail error"});
		};
	});
});
//删除用户
router.get("/delete",(req,res)=>{
	var obj=req.query;
	var $uid=obj.uid;
	if(!$uid){
		res.send({code:"401",msg:"uid required"});
		return;
	};
	pool.query("DELETE FROM wzh_user WHERE uid=?",[$uid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({code:"200",msg:"delete succeed"});
		}else{
			res.send({code:"301",msg:"delete error"});
		};
	});
});
//用户列表
router.get("/list",(req,res)=>{
	var obj=req.query;
	var $pno=parseInt(obj.pno);
	var $count=parseInt(obj.count);
	if(!$pno){
		$pno=0
	};
	if(!$count){
		$count=2;
	};
	var start=($pno-1)*$count;
	pool.query("SELECT * FROM wzh_user LIMIT ?,?",[start,$count],(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});
//导出路由
module.exports=router;