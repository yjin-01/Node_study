const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const path = require("path");

const app = express();

app.set("port", process.env.PORT || 3000);
// 미들웨어는 대부분 내부적으로 next() 실행중
app.use(morgan("combined")); // 요청에 대한 정보(메서드, 상태코드, 응답 시간)
// 개발시 dev 실무에서는 combined 사용

// app.use("요청 경로", express.static("실제 경로"));
// localhost:3000/aaa.html => node_study/public/aaa.html (요청 경로와 실제 경로가 다른 경우)
// => 클라이언트가 서버의 폴더를 예상하지 못함(보안에도 좋음!)
app.use("/", (req, res, next) => {
  if (req.session.id) {
    express.static(__dirname, "public")(req, res, next); // 미들웨어 내부의 미들웨어 =  미들웨어 확장법
  } else {
    next();
  }
});

app.use(cookieParser()); // 쿠키관련 조작을 더 편리하게 가능
// app.use(cookieParser("aaa")); => 쿠키를 암호화 하여 사용 가능

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  })
);

// 자동으로 데이터 파싱
app.use(express.json()); // 클라이언트에서 json 데이터를 보내는 경우 파싱해서 req.body로 넣어줌
app.use(express.urlencoded({ extended: true })); // form 데이터를 파싱
// 보통 true!! true면 qs false는 queryString
// 이미지 파일은 multer라는 라이브러리 사용

// use를 이용해 서버에 미들웨어 장착
app.use(
  (req, res, next) => {
    console.log("모든 요청에 실행!");
    req.session.data = "데이터"; // session에 저장한다면 다음 요청에도 데이터가 그대로 남아있음
    req.data = "일회성 데이터";
    next();
  },
  (req, res, next) => {
    req.session.data; // 데이터
    req.data; // 일회성 데이터
  }
);

// 라우터 ==  미들웨어를 장착할 수 있는 공간
app.get("/", (req, res, next) => {
  req.session; // 요청을 보낸 사용자에 대한 고유한 session == 개인 저장 공간
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/", (req, res) => {
  res.send("안녕");
});

// 404처리용 미들웨어(모든 라우터에 해당하지않은 경우 실행)
app.use((req, res, next) => {
  res.status(404).send("!404 page!");
});

// 에러 미들웨어는 반드시 4개의 매개변수 필요!!!
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("에러 발생!!");
});

app.listen(app.get("port"), () => {
  console.log("start express server!");
});
