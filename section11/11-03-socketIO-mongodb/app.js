const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const passport = require("passport");
const connect = require("./schemas");
const ColorHash = require("color-hash").defalut;
dotenv.config(); // process.env

const websocket = require("./socket");
const indexRouter = require("./routes");

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "html");
nunjucks.configure("views", { express: app, watch: true });

// db연결
connect();
app.use(morgan("dev")); // 서버 로깅

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET)); // { connect.sid : 123413432 }
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false, // 개발 단계에서는 false
    },
  })
);
app.use((req, res, next) => {
  if (!req.session.color) {
    const colorHash = new ColorHash();
    req.session.color = colorHash.hex(req.sessionID); // 컬러로 유저 구분
    console.log(req.session.color, req.sessionID);
  }
  next();
});

app.use("/", indexRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.Node_ENV !== "production" ? err : {}; // 실제 배포된 후에는 에러 로그를 서비스에게 넘김
  res.status(err.status || 500);
  console.log(err);
  res.render("error"); // 넌적스가 페이지 찾아서 보내줌
});

const server = app.listen(app.get("port"), () => {
  console.log(app.get("port"), " 번 포트 실행중 🚀🚀🚀");
}); // express

websocket(server, app); // session에 컬러 저장해서 socket에서 사용할 수 있도록
