const spawn = require("child_process").spawn; // spawn으로 호출

const process = spawn("python3", ["test.py"]);

process.stdout.on("data", function (data) {
  console.log(data.toString());
}); // 실행 결과

process.stderr.on("data", function (data) {
  console.error(data.toString());
}); // 실행 에러
