const express = require("express");
const {
  createToken,
  tokenTest,
  getMyPosts,
  getPostsByHashtag,
} = require("../controllers/v1");
const { verifyToken, deprecated } = require("../middlewares");
const router = express.Router();

router.use(deprecated);
// 토큰 발급
router.post("/token", createToken);

//
router.get("/test", verifyToken, tokenTest);

// 나의 게시물 조회
router.get("/posts/my", verifyToken, getMyPosts);

// 해시태그로 조회
router.get("/posts/hashtag/:title", verifyToken, getPostsByHashtag);

module.exports = router;
