const express = require('express');
const router = express.Router();
const passport = require('passport');
const {User} = require('../models/User');
const {secretOrKey, expiresIn} = require("../config/jwt");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//登录路由处理
router.post('/login', async (req, res) => {
  const {email, password, _id} = req.body;
  if (email.trim().length === 0 || password.trim().length === 0) {
    return res.status(400).json({status: 400, message: '邮箱或密码错误'})
  }
  let user = await User.findOne({email}); // 查找用户
  if (user) {
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      let _id = user._id.toString();
      let rule = {id: _id};
      jwt.sign(rule, secretOrKey, {expiresIn}, (err, token) => {
        res.json({status: 200, message: '登陆成功', token: "Bearer " + token});
      });
    } else {
      res.status(400).json({status: 400, message: '邮箱或密码错误'})
    }
  } else {
    res.status(400).json({status: 400, message: '邮箱或密码错误'})
  }
});

// 首先要验证，然后才是放行到对应的路由接口里面取
router.get('/text', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.send({status: 200, message: '成功',});
});

module.exports = router;
