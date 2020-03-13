const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const logger = require("morgan");
const cateNewsRouter = require("./routes/cateNews");
const newsRouter = require("./routes/news");
const loginRouter = require("./routes/login");
const newsEditRouter = require("./routes/newsEditor");
const newsSensorRouter = require("./routes/newsSensor");
const likeRouter = require('./routes/like');
const rateRouter = require('./routes/rate');
const usersRouter = require('./routes/users');
const followersRouter = require('./routes/follow');
const statisticalRouter = require('./routes/statistical');
const commentRouter = require('./routes/comment');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
rateRouter
app.use(fileUpload());
dotenv.config();
app.use(cookieParser());
// view engine setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Cache-Control, Pragma, Origin, Authorization, token, Access-Control-Allow-Headers,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  return next();
});

// connect to mongoDB
let urlData = process.env.DATABASE_URL;
const connectMongoDB = async () => {
  try {
    await mongoose.connect(urlData, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    console.log("connect successfuly to mongoDB!");
  } catch (error) {
    console.error("connect MongoDB has error: " + error);
  }
};
connectMongoDB();

app.use('/users', usersRouter);
app.use("/cateNews", cateNewsRouter);
app.use("/news", newsRouter);
app.use("/newsEdits", newsEditRouter);
app.use("/newsSensors", newsSensorRouter);
app.use("/login", loginRouter);
app.use('/likes', likeRouter);
app.use('/rates', rateRouter);
app.use('/statisticals', statisticalRouter);
app.use('/followers', followersRouter);
app.use('/comments', commentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port  = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started at port: ${port}`));
