const exp = require("constants");
const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(morgan("combined")); // 요청에 대한 정보(메서드, 상태코드, 응답 시간)
// 개발시 dev 실무에서는 combined 사용

app.use(cookieParser()); // 쿠키관련 조작을 더 편리하게 가능
// app.use(cookieParser("aaa")); => 쿠키를 암호화 하여 사용 가능

// 자동으로 데이터 파싱
app.use(express.json()); // 클라이언트에서 json 데이터를 보내는 경우 파싱해서 req.body로 넣어줌
app.use(express.urlencoded({ extended: true })); // form 데이터를 파싱
// 보통 true!! true면 qs false는 queryString
// 이미지 파일은 multer라는 라이브러리 사용

// use를 이용해 서버에 미들웨어 장착
app.use(
  (req, res, next) => {
    console.log("모든 요청에 실행!");
    next(); // 다음 미들웨어를 실행!!!
  } //
);

// 라우터 ==  미들웨어를 장착할 수 있는 공간
app.get("/", (req, res, next) => {
  // req.cookies; // { mycookie: 'test' , name: "jini"}
  // // req.signedCookies; => 암호화된 쿠키 사용 시
  // //"Set-Cookie": `name=${encodeURIComponent( name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`
  // res.cookie("name", encodeURIComponent(name), {
  //   expires: new Date(),
  //   httpOnly: true,
  //   path: "/",
  // });

  // // 쿠키 삭제
  // res.clearCookie("name", encodeURIComponent(name), {
  //   httpOnly: true,
  //   path: "/",
  // });

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
