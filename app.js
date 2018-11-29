//引入express模块
const express=require('express');
const bodyParser=require('body-parser');
var app=express();
app.listen(3000);
app.use(express.static('public'));
//引入用户模块
const userRouter=require('./router/user.js');
app.use(bodyParser.urlencoded({
	extended:false
}));
app.use('/user',userRouter);


