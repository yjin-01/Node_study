const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

exports.join = async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.redirect("/join?error=exist");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    // 회원 가입
    await User.create({
      email,
      nick,
      password: hashedPassword,
    });

    return res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Post /auth/login
exports.login = (req, res, next) => {
  console.log("실행?");
  // local strategy 호출
  passport.authenticate(
    "local",
    // strategy에서 done이 실행되는 순간 이 로직이 실행됨!!
    (authError, user, info) => {
      // 서버 에러 시
      if (authError) {
        console.log(error);
        return next(authError);
      }

      // 로그인 실패 시
      if (!user) {
        return res.redirect(`/?error=${info.message}`);
      }

      // 로그인 성공 시
      return req.login(user, (loginError) => {
        console.log("=====");
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        return res.redirect("/");
      });
    }
  )(req, res, next);
};
exports.logout = (req, res, next) => {
  // 세션쿠키를 삭제하는 역할 ==> 브라우저에 남아있어도 서버에서 삭제되었기때문에 사용불가
  req.logout(() => {
    res.redirect("/");
  });
};
