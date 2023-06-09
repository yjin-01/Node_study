const https = require("https"); // https 모듈
const fs = require("fs");

https
  .createServer(
    {
      // 서버가 시작되기 전 초기화하는 경우에는 Sync사용 가능
      // 도메인에 대한 인증서가 발급되면 관련 파일 활용 가능
      cert: fs.readFileSync("도메인 인증서 경로"),
      key: fs.readFileSync("도메인 비밀키 경로"),
      ca: [
        fs.readFileSync("상위 인증서 경로"),
        fs.readFileSync("상위 인증서 경로"),
      ],
    },
    (req, res) => {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write("<h1>Hello Node!</h1>");
      res.end("<p>Hello Server!</p>");
    }
  )
  .listen(443, () => {
    console.log("443번 포트에서 서버 대기 중입니다!");
  });
