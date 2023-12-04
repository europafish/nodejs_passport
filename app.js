var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const dayjs = require("dayjs");
const config = require("./config");
const session = require("express-session");
const passport = require("passport");
// const getUserFromJWT = require('./middlewares/get-user-from-jwt');

const MongoStore = require("connect-mongo");

const local_strategy = require("./passport");
//const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${config.id}:${config.pw}@board.9l9oimv.mongodb.net/?retryWrites=true&w=majority`;

const loginRequired = require("./middlewares/login-required.js");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const authRouter = require("./routes/auth");
const apiRouter = require("./routes/api");

local_strategy();
// 연결
mongoose.connect(uri);

// 연결 알림
mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
// 나중에 pug에서 사용하는 함수
app.locals.formatDate = (date) => {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
};
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "test",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: uri,
    }),
  })
);

// jwt 로그인 미들웨어 추가
// app.use(getUserFromJWT);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/posts", loginRequired, postsRouter);
app.use("/users", loginRequired, usersRouter);
app.use("/api", loginRequired, apiRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
