const express = require("express");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const path = require("path");

const { sequelize } = require("./models");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const commentsRouter = require("./routes/comments");

const app = express();
app.use(morgan("dev"));

app.set("port", process.env.PORT || 3000);

app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

// 데이터베이스 연결 코드
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("🚀🚀🚀 db conneting success");
  })
  .catch((err) => {
    console.log("db connection fail");
    console.log(errç);
  });

app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/comments", commentsRouter);

app.use((req, res, next) => {
  const error = new Error(
    `${req.method} ${req.url}에 해당하는 라우터가 없습니다.`
  );
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트 실행중");
});
