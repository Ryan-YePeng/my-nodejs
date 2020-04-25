const mongoose = require("mongoose");
const mongodbURL = require("../config/mongodbURL").mongodbURL;

mongoose.set('useCreateIndex', true);
mongoose.connect(mongodbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("数据库已连接"))
  .catch(err => console.log(err));
