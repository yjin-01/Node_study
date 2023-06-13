const express = require("express");
const path = require("path");

const app = express();

app.set("port", process.env.PORT || 3000);

// use를 이용해 서버에 미들웨어 장착
app.use(
  // 특정 주소에서만 실행하고 싶다면 라우터처럼 주소 지정 가능
  // 미들웨어
  (req, res, next) => {
    console.log("모든 요청에 실행!");
    next(); // 다음 미들웨어를 실행!!!
  }, //
  (req, res, next) => {
    try {
    } catch (error) {
      next(error); // next에 인수가 있는 경우 에러로 처리하여 에러 미들웨어로 넘어감
    }
  },
  (req, res, next) => {
    console.log("모든 요청에 실행!");
    next();
  } // 여러개의 미들웨어 사용 가능
);

// 라우터 ==  미들웨어를 장착할 수 있는 공간
app.get(
  "/",
  (req, res, next) => {
    // res.sendFile(path.join(__dirname, "index.html"));
    res.send("안녕");
    // res.json({ hello: "hi" });
    // res.render()
    next("route"); // 같은 주소의 다음 라우터 실행
    // next(); // 같은 라우터내의 다음 미들웨어 실행
  },
  (req, res) => {
    console.log("실행?");
    res.send("안녕");
  }
);

app.get("/", (req, res) => {
  res.send("안녕");
});

app.post("/", (req, res) => {
  // http 모듈
  // res.writeHead(200,{'Content-Type': 'text/plain'})
  // res.end("안녕하세요")

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.send("hello expresss"); // 위의 두 줄의 코드를 합쳐서 express에서 제공하는 것
});

app.get("/category/javascript", (req, res) => {
  res.send(`hello javascript`);
});

// 와일드카드 사용한 라우터는 항상 다른 라우터들보다 아래에 위치해야함
app.get("/category/:name", (req, res) => {
  res.send(`hello ${req.params.name}`);
});

app.get("/about", (req, res) => {
  res.send("hello expresss");
});

// 모든 요청을 받는 라우터
// app.get("*", (req, res) => {
//   res.send("Hello Every");
// });

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

// express 서버의 순서
// 앱생성
// 앱설정
// 공통 미들웨어
// 라우터
// 에러 미들웨어
