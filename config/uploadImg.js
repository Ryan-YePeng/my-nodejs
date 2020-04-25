const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const moment = require('moment');
const imgUploadUrl = '../static/picture';

/* 图片上传 */
module.exports = (req, res) => {
  let form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.keepExtensions = true;
  form.uploadDir = path.join(__dirname, imgUploadUrl);
  form.maxFileSize = 3 * 1024 * 1024; // 限制大小
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({status: "400", message: '上传失败，请上传3MB以下的图片'});
    }
    let file = files.file;
    let fileName = file.name;
    /* 拼接新的文件名 */
    let time = moment().format('YYYYMMDDHHmmss');
    let num = Math.floor(Math.random() * 8999 + 10000);
    let extName = "";
    if (fileName.lastIndexOf(".") !== -1) {
      extName = fileName.slice(fileName.lastIndexOf("."));
    }
    let imageName = `${time}_${num}${extName}`;
    let newPath = form.uploadDir + '/' + imageName;
    /* 上传 */
    fs.rename(file.path, newPath, (err) => {
      if (err) {
        res.status(400).json({status: 400, message: '上传失败'});
      } else {
        res.send({status: 200, message: '上传成功', result: {path: `/picture/${imageName}`}});
      }
    })
  })
};
