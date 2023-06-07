const fs = require("fs");

const readStream = fs.createReadStream("./13-02-readme.txt", {
  highWaterMark: 16, // 64kbyte = 64000 = > 기본값
});

const writeStream = fs.createWriteStream("./13-05-writeme.txt");

readStream.pipe(writeStream);
