const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();
app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  })
);

const multer = require("multer");
const fs = require("fs");

// uploads 폴더 생성
// 서버 시작 전의 세팅이기때문에 Sync 사용 가능
try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}
const upload = multer({
  // 업로드한 파일 저장 위치 ex) 디스크, 메모리 , 클라우드 스토리지(S3)
  storage: multer.diskStorage({
    destination(req, file, done) {
      // 어디에저장?
      done(null, "uploads/"); //  done(): 첫번때 인수는 에러난 경우 에러 처리 미들웨어로 전달하기위한 인수
    },
    filename(req, file, done) {
      // 어떤 이름?
      const ext = path.extname(file.originalname); // 확장자 추출
      done(null, path.basename(file.originalname, ext) + Date.now() + ext); // 같은 이름의 파일 중복을 피하기 위해 날짜 포함
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 파일 사이즈 제한
});

app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "multipart.html"));
});

// 특정 라우터에서만 일어나기 때문에 해당 라우터에서만 작동하도록 적용
// 한개의 파일만 업로드하는 경우
// 파일 타입이 name과 일치해야함
app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file); // 업로드에 대한 정보 저장되어 있음
  res.send("ok");
});

// 여러 파일을 업로드하는 경우 array 미들웨어 사용
app.post("/upload2", upload.array("images"), (req, res) => {
  console.log(req.files, req.body);
  res.send("ok");
});

// 파일을 여러 개 업로드하지만 input 태그나 폼 데이터의 키가 다른 경우에는 fields 미들웨어를 사용
app.post(
  "/upload3",
  upload.fields([{ name: "image1", limits: 5 }, { name: "image2" }]),
  (req, res) => {
    console.log(req.body);
    console.log(req.files.image1);
    console.log(req.files.image2);
    res.send("ok");
  }
);
// 이미지가 없지만 형식이 폼 데이터인 경우
app.post("/upload4", upload.none(), (req, res) => {
  console.log(req.body);
  res.send("ok");
});

app.get(
  "/",
  (req, res, next) => {
    console.log("GET / 요청에서만 실행됩니다.");
    next();
  },
  (req, res) => {
    throw new Error("에러는 에러 처리 미들웨어로 갑니다.");
  }
);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
