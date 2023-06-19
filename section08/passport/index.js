const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const User = require("../models/user");

module.exports = () => {
  console.log("ssss");
  // req.login시 실행
  passport.serializeUser((user, done) => {
    console.log("?????");
    done(null, user.id); // user id 추출
  });

  // 세션쿠키: 유저 아이디 => 메모리에 저장됨

  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
  // 로컬스트레티지 등록
  local();
  kakao();
};
