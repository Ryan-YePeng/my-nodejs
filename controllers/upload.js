const express = require('express');
const router = express.Router();
const uploadImg = require('../config/uploadImg');
const passport = require('passport');

// 上传卡片图片
router.post("/img", passport.authenticate('jwt', {session: false}), (req, res) => {
  uploadImg(req, res);
});

module.exports = router;
