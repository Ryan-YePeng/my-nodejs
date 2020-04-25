const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const formatTime = require('silly-datetime');
const imgUploadUrl = '../static/picture';

/* 图片上传 */
module.exports = (req, res) => {
  let form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.keepExtensions = true;
  form.uploadDir = path.join(__dirname, imgUploadUrl);
  // /* 大小限制 */
  // form.on('progress', function (bytesReceived, bytesExpected) {
  //   if (bytesExpected > 1024 * 1024 * 2) {
  //     this.emit('error', "文件过大")
  //   }
  // });
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({status: "500", message: '服务器内部错误'});
    }
    let file = files.file;
    let fileName = file.name;
    /* 拼接新的文件名 */
    let time = formatTime.format(new Date(), 'YYYYMMDDHHmmss');
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
        return res.status(400).json({status: 400, message: '上传失败'});
      } else {
        res.send({status: 200, message: '上传成功', result: {path: `/picture/${imageName}`}});
      }
    })
  })
};


// module.exports = (req, res) => {
//   let form = new formidable.IncomingForm();
//   form.encoding = 'utf-8';
//   form.keepExtensions = true;
//   form.uploadDir = path.join(__dirname, imgUploadUrl);
//   form.parse(req, (err, fields, files) => {
//     let file = files.file;
//     if (fields.hasOwnProperty('path')) {
//       console.log(fields.path)
//     }
//     /* 如果出错，则拦截 */
//     if (err) {
//       return res.status(500).json({status: "500", message: '服务器内部错误'});
//     }
//     /* 拼接新的文件名 */
//     let time = formatTime.format(new Date(), 'YYYYMMDDHHmmss');
//     let num = Math.floor(Math.random() * 8999 + 10000);
//     let imageName = `${time}_${num}.png`;
//     let newPath = form.uploadDir + '/' + imageName;
//
//     fs.rename(file.path, newPath, (err) => {
//       if (err) {
//         return res.status(400).json({status: 400, message: '上传失败'});
//       } else {
//         res.send({status: 200, message: '上传成功', result: {path: `/picture/${imageName}`}});
//       }
//     })
//   })
// };
