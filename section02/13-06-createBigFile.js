const fs = require("fs");

const file = fs.createWriteStream("./13-07-big.txt");

for (let i = 0; i <= 10_000_000; i++) {
  file.write("엄청나게 큰 파일 생성하기! 시간이 오래걸림");
}
file.end();
