const express = require("express");
const {
  renderProfile,
  renderJoin,
  renderMain,
} = require("../controllers/page");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followingIdList = [];

  //res.session.data  사용자간의 데이터 공유(사용자가 로그인한 동안 저장 가능)
  next();
});

router.get("/profile", isLoggedIn, renderProfile);

router.get("/join", isNotLoggedIn, renderJoin);

router.get("/", renderMain);

module.exports = router;
