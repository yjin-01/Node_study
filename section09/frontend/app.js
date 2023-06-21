const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");

dotenv.config(); // process.env
const indexRouter = require("./routes/index");

const app = express();
app.set("port", 4000);
app.set("view engine", "html");
nunjucks.configure("views", { express: app, watch: true });

app.use(morgan("dev")); // 서버 로깅
app.use(express.static(path.join(__dirname, "public"))); // 프론트에서 접근가능하도록 허용

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

app.use("/", indexRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err?.data?.message;
  res.locals.error = process.env.Node_ENV !== "production" ? err : {}; // 실제 배포된 후에는 에러 로그를 서비스에게 넘김
  res.status(err.status || 500);
  console.log("??", err);
  res.render("error"); // 넌적스가 페이지 찾아서 보내줌
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트 실행중 🚀🚀🚀");
});
