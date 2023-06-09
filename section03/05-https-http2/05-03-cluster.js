const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length; // cpu 개수

if (cluster.isMaster) {
  console.log(`마스터 프로세스 아이디: ${process.pid}`);

  // cpu개수만큼 워커 프로세스 생산
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  // 워커 종료시
  cluster.on("exit", (worker, code, signal) => {
    console.log(`${worker.process.pid} 번 워커 종료`);
    console.log(`code: ${code}, 'signal: ${signal}`);
    // cluster.fork(); 실무에서 워커 프로세스가 종료되는 경우 다시 실행시키기 위한 코드
  });
} else {
  http
    .createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write("<h1> Hello world </h1>");
      res.end("<p> Hello Cluster </p>");
      setTimeout(() => {
        process.exit(1);
      }, 1000);
    })
    .listen(8080); // 하나의 포트에서 여러개의 프로세스 사용가능

  console.log(`${process.pid}번 워커 실행`);
}
