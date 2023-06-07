const fs = require("fs").promises;

fs.writeFile("./12-04-writeme.txt", "작성한 파일")
  .then(() => {
    return fs.readFile("./12-04-writeme.txt");
  })
  .then((data) => {
    console.log(data);
    console.log(data.toString());
  })
  .catch((err) => {
    throw err;
  });
