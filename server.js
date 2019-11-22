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
const statisticalRouter = require('./routes/statistical');
// const viewRouter = require('./routes/view')
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();

app.use(fileUpload());
dotenv.config();

let urlData = process.env.DATABASE_URL;
const connectMongoDB = async () => {
  try {
    await mongoose.connect(urlData, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    console.log("connect successful!");
  } catch (error) {
    console.error("connect MongoDb has error: " + error);
  }
};

connectMongoDB();

app.use(cookieParser());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/")));

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

app.use('/users', usersRouter);
app.use("/cateNews", cateNewsRouter);
app.use("/news", newsRouter);
app.use("/newsEdits", newsEditRouter);
app.use("/newsSensors", newsSensorRouter);
app.use("/login", loginRouter);
app.use('/likes', likeRouter);
app.use('/rates', rateRouter);
app.use('/statisticals', statisticalRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// var publicDir = require('path').join(__dirname);
// app.use(express.static(publicDir));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
