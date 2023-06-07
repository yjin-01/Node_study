const fs = require("fs");

console.log("before: ", process.memoryUsage().rss);

const readStream = fs.createReadStream("./13-07-big.txt");
const writeStream = fs.createWriteStream("./13-09-big-stream.txt");
readStream.pipe(writeStream);
readStream.on("end", () => {
  console.log("stream: ", process.memoryUsage().rss);
});
