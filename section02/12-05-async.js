const fs = require("fs");

// 비동기 함수이기때문에 순서대로 실행 X
// 백그라운드로 넘어가게되면 동시에 실행되기 때문에 실행순서를 알 수 없음
// 운영체제가 먼저 읽은 순서대로 태스크큐에 넣어서 출력

fs.readFile("./12-01-readme.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("1번", data.toString());
});

fs.readFile("./12-01-readme.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("2번", data.toString());
});

fs.readFile("./12-01-readme.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("3번", data.toString());
});

fs.readFile("./12-01-readme.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("4번", data.toString());
});
