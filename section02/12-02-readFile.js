// const fs = require("fs");

// fs.readFile("./12-01-readme.txt", (err, data) => {
//   // 콜백 지옥에 빠질 수 있음
//   if (err) {
//     throw err;
//   }

//   console.log(data);
//   console.log(data.toString());
// });

// 콜백 지옥 해결 방안으로 promise를 지원함
const fs = require("fs").promises;

fs.readFile("./12-01-readme.txt")
  .then((data) => {
    console.log(data);
    console.log(data.toString());
  })
  .catch((err) => {
    throw err;
  });
