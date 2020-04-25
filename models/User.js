const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * @description 创建集合
 * */

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 2,
    max: 10
  },
  email: {
    type: String,
    //注意 我们的邮箱凭据是用户登录的令牌，我们需要指定他为唯一的
    unique: true, //这个时候，在插入的时候如果有重复的就给你抱一个错误
  },
  password: {
    type: String,
    required: true,
  },
  role: { //需要说明一下，这个地方角色，我们硬性规定，超级管理员是admin普通用户是normal，为什么不用01？因为这里string了
    type: String,
    required: true
  },
  state: {
    //我们使用O1状态来设计这个数据字段，默认值是0。0是启用状态
    type: Number,
    default: 0
  }
});

//使用规则创建集合,
//一定要注意，我们的User就是代表了我目前最user数据集合，后期的增删改查我们都需要用到这个东西，所有我们暴露出去给路由业务使用
const User = mongoose.model('User', userSchema);


//我们再来复习一下，如何用同步的方式获取异步的api结果？使用async 还有awit就可以

async function createUser() {
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash('123456', salt);
  const user = await User.create({
    username: 'lli',
    email: '18376621755@163.com',
    password: pass,
    role: 'admin',
    state: 0,
  })
}

// createUser();

//注意啊，es6中如果键值对的名字是一样的就可以省略值。由于我们后期还会做更多的数据集合，于是乎我这里需要暴露一个对象出去
module.exports = {
  User
};
