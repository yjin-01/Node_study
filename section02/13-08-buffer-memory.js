const fs = require("fs");

console.log("before: ", process.memoryUsage().rss);

const data1 = fs.readFileSync("./13-07-big.txt");
fs.writeFileSync("./13-08-big-buffer.txt", data1);
console.log("buffer: ", process.memoryUsage().rss);
