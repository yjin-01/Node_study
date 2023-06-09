const { error } = require("console");
const http = require("http");

const server = http
  .createServer((req, res) => {
    // 요청이 오면 함수 실행
    // 응답을 거부할수도 있음
    res.write("<h1> Hello node </h1>");
    res.write("<p> Hello server </p>");
    res.end("<p> Hello world </p>"); // stream 기반
  })
  .listen(8080); // 서버를 process로 올려주어야함 이때 포트번호 필요

//서버를 실행(listen)하는 경우에는 하나의 터미널을 차지

server.on("listening", () => {
  console.log("start 8080 server!");
});

// 비동기이므로 에러 처리 필수!
server.on("error", (error) => {
  console.error(error);
});
