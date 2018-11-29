const mysql=require('mysql');
//创建连接池
var pool=mysql.createPool({
	host:'127.0.0.1',
	post:3306,
	user:'root',
	password:'',
	database:'wzh',
	connectionLimit:50
});
//导出连接池
module.exports=pool;