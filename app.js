const bodyParser = require('body-parser');
const express = require('express');
const passport = require("passport");
const path = require('path');
const app = express();


// 配置
require("./config/http")(app); // 跨域
require("./config/mongodb"); // MongoDB
require('./passport')(passport); // 验证token


// 中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));
app.use(passport.initialize());


// 路由
app.use(require('./controllers/user'));
app.use('/upload', require('./controllers/upload'));


// 创建服务器
app.listen(3000, () => {
  console.log(`启动成功：http://localhost:3000`);
});


// 捕获异常
process.on('uncaughtException', (err) => {
  console.log('Caught Exception: ' + err);
});
