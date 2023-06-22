const app = require("./app");

app.listen(app.get("port"), () => {
  console.log(app.get("port"), " 번 포트 실행중 🚀🚀🚀");
});
