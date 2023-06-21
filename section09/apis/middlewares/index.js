// 여러 라우터에서 공통적으로 사용하는 미들웨어 모음집

const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const { User, Domain } = require("../models");

const cors = require("cors");

exports.isLoggedIn = (req, res, next) => {
  // 패스포트 통해서 로그인 했니
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  // 패스포트 통해서 로그인 안했니
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.");
    res.redirect(`/?error=${message}`);
  }
};

exports.verifyToken = (req, res, next) => {
  try {
    res.locals.decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRETKEY
    );
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({
        code: 419,
        message: "토큰 만료",
      });
    }

    return res.status(401).json({
      code: 401,
      message: "유효하지 않은 토큰입니다.",
    });
  }
};

// api횟수 제한
// 디도스(여러개의 컴퓨터가 서버에 많은 요청을 보내는 것) 공격에는 효과가 없음
// 이유:: 요청 자체가 전송되고 난후에 api요청을 막아주는 것이기 때문에 디도스 공격을 막지 못함
// 실질적으로 서버에 무리가 오는 것
// 중요 서버 앞단에 서버를 하나더 두고 디도스 공격을 막을 수 있도록 함

//
exports.apiLimiter = async (req, res, next) => {
  let user;
  if (res.locals.decoded.id) {
    user = await User.findOne({ where: { id: res.locals.decoded.id } });
  }

  user?.type === "premium" ? (max = 1000) : (max = 10);

  rateLimit({
    windowMs: 60 * 1000,
    max,
    handler(req, res) {
      res.status(this.statusCode).json({
        code: this.statusCode,
        message: "1분에 한번만 요청 가능합니다",
      });
    },
  })(req, res, next);
};

// 새로운 버전 알림
exports.deprecated = (req, res) => {
  res.status(410).json({
    code: 410,
    message: "새로운 버전이 나왔습니다. 새로운 버전을 사용하세요",
  });
};

exports.corsWhenDomainMatches = async (req, res, next) => {
  const domain = await Domain.findOne({
    where: { host: new URL(req.get("origin")).host }, // http제외 주소만
  });
  console.log("domain", domain, new URL(req.get("origin")).host);
  if (domain) {
    cors({
      origin: req.get("origin"), // * , ture => 모든 주소 허용
      credential: true, // 쿠키허용  => true인 경우 origin에 * 사용 못함
    })(req, res, next);
  } else {
    next(); // cors에러 발생
  }
};
