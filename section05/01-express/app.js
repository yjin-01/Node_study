const express = require("express");
const path = require("path");

const app = express();

app.set("port", process.env.PORT || 3000); // 서버에 속성을 추가 (마치 전역 변수처럼 사용 가능)

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html")); // fs모듈을 사용해서 파일 호출 가능
});

app.post("/", (req, res) => {
  res.send("hello expresss");
});

app.listen(app.get("port"), () => {
  console.log("start express server!");
});
