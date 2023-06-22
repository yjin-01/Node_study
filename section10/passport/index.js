const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const User = require("../models/user");

module.exports = () => {
  // req.login시 실행
  passport.serializeUser((user, done) => {
    done(null, user.id); // user id 추출
  });

  // 세션쿠키: 유저 아이디 => 메모리에 저장됨
  // req.user를 생성하는 곳
  passport.deserializeUser((id, done) => {
    User.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ["id", "nick"],
          as: "Followers",
        }, // 팔로잉
        {
          model: User,
          attributes: ["id", "nick"],
          as: "Followings",
        }, // 팔로워
      ],
    })
      .then((user) => done(null, user)) // req.user
      .catch((err) => done(err));
  });
  // 로컬스트레티지 등록
  local();
  kakao();
};
