const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", // req.body.email
        passwordField: "password", //req.body.password
        passReqToCallback: false, // req유무
      },
      async (email, password, done) => {
        // done(서버 실패(db에서 실패), 성공유저, 로직 실패)
        try {
          const user = await User.findOne({ where: { email } });
          if (user) {
            const result = await bcrypt.compare(password, user.password);
            if (result) {
              done(null, user); //
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다." });
          }
        } catch (error) {
          console.error(error);
          done(error); // 서버 실패
        }
      }
    )
  );
};
