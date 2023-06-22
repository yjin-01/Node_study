const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { afterUploadImage, uploadPost } = require("../controllers/post");

try {
  fs.readdirSync("uploads");
} catch (error) {
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname); // 이미지.png -> 이미지(날짜).png
      console.log("ext:", ext);
      console.log("basename::", path.basename(file.originalname, ext));
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),

  limits: { fieldSize: 5 * 1024 * 1024 }, // 5메가바이트
});

router.post("/img", isLoggedIn, upload.single("img"), afterUploadImage);

const upload2 = multer(); // 설정이 달라서 새로 생성
router.post("/", isLoggedIn, upload2.none(), uploadPost);

module.exports = router;
