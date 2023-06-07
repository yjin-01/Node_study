const fs = require("fs");

// 동기 메서드이기때문에 몇번을 실행해도 같은 순서

let data = fs.readFileSync("./12-01-readme.txt");
console.log("1번", data.toString());

data = fs.readFileSync("./12-01-readme.txt");
console.log("2번", data.toString());

data = fs.readFileSync("./12-01-readme.txt");
console.log("3번", data.toString());

data = fs.readFileSync("./12-01-readme.txt");
console.log("4번", data.toString());
