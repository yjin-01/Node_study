const express = require("express");
const passport = require("passport");
const { isNotLoggedIn, isLoggedIn } = require("../middlewares");
const { join, login, logout } = require("../controllers/auth");

const router = express.Router();

// Post /auth/join
router.post("/join", isNotLoggedIn, join);

// Post /auth/login
router.post("/login", isNotLoggedIn, login);

// Post /auth/logout
router.post("/logout", isLoggedIn, logout);

// GET /auth/kakao
router.get("/kakao", passport.authenticate("kakao")); // 카카오톡 로그인 화면으로 redirect

// auth/kakao ->  카카오톡 로그린 화면 -> /auth/kakao/callback

// GET /auth/kakao/callback
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/?error=카카오로그인 실패",
  }),
  (req, res) => {
    res.redirect("/"); // 성공 시에는 /로 이동
  }
);
module.exports = router;
