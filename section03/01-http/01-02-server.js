const { error } = require("console");
const http = require("http");

const fs = require("fs").promises;

const server = http
  .createServer(async (req, res) => {
    try {
      // 브라우저가 html 태그를 인식하지 못하는 경우가 있음(ex. safari)
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      const data = await fs.readFile("./01-02-server.html");
      res.end(data); // data에 저장된 버퍼를 그대로 보내줌
    } catch (error) {
      console.error(error);
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(err.message);
    }
  })
  .listen(8080);

server.on("listening", () => {
  console.log("start 8080 server!");
});

// 비동기이므로 에러 처리 필수!
server.on("error", (error) => {
  console.error(error);
});
