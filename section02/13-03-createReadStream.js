const fs = require("fs");

const readStream = fs.createReadStream("./13-02-readme.txt", {
  highWaterMark: 16, // 64kbyte = 64000 = > 기본값
});

const data = [];
readStream.on("data", (chunk) => {
  data.push(chunk);
  console.log("data:", chunk.toString(), chunk.length);
});

readStream.on("end", () => {
  console.log("end", Buffer.concat(data).toString());
});

readStream.on("error", (err) => {
  console.log("error:", err);
});

// 메모리 방면에서 굉장히 효율적임
