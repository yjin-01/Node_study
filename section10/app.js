const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const passport = require("passport");
const { sequelize } = require("./models");
const passportConfig = require("./passport");

dotenv.config(); // process.env
const pageRouter = require("./routes/page");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");

const app = express();
passportConfig();
app.set("port", process.env.PORT || 3000);
app.set("view engine", "html");
nunjucks.configure("views", { express: app, watch: true });

// db연결
sequelize
  .sync({ force: false }) // 개발시 true해두면 테이블 수정 사항 바로 반영 가능 / 배포때는 절대 xxxx
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev")); // 서버 로깅
app.use(express.static(path.join(__dirname, "public"))); // 프론트에서 접근가능하도록 허용
app.use("/img", express.static(path.join(__dirname, "uploads")));

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
// 반드시 세션 아래에!
app.use(passport.initialize()); // 연결 시 req.user, req.login, req.isAuthenticate, req.logout이 생성
app.use(passport.session()); // connect.sid 라는 이름으로 세션 쿠키가 브라우저로 전송 (쿠키 로그인을 도와주는 역할)
app.use("/", pageRouter);
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);

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

module.exports = app;

// 통합테스트(supertest)에서 app만 필요로 함
