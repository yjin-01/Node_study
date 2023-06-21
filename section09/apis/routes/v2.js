const express = require("express");
const {
  createToken,
  tokenTest,
  getMyPosts,
  getPostsByHashtag,
} = require("../controllers/v2");
const {
  verifyToken,
  apiLimiter,
  corsWhenDomainMatches,
} = require("../middlewares");
const router = express.Router();

router.use(corsWhenDomainMatches);

// router.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
//   res.setHeader("Access-Control-Allow-Headers", "content-type");
//   next();
// });

// 토큰 발급
router.post("/token", createToken);

//
router.get("/test", verifyToken, tokenTest);

// 나의 게시물 조회
router.get("/posts/my", verifyToken, apiLimiter, getMyPosts);

// 해시태그로 조회
router.get("/posts/hashtag/:title", verifyToken, apiLimiter, getPostsByHashtag);

module.exports = router;
