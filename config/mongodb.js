const mongoose = require("mongoose");
const mongodb = "mongodb://localhost/blog";

mongoose.set('useCreateIndex', true);
mongoose.connect(mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("数据库已连接"))
  .catch(err => console.log(err));
