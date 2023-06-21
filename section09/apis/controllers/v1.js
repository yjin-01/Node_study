const Domain = require("../models/domain");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Hashtag = require("../models/hashtag");
const Post = require("../models/post");

exports.createToken = async (req, res, next) => {
  const { clientSecret } = req.body;
  try {
    const domain = await Domain.findOne({
      where: { clientSecret },
      include: {
        model: User,
        attributes: ["id", "nick"],
      },
    });

    if (!domain) {
      return res.status(401).json({
        code: 401,
        message: "등록되지 않은 도메인 입니다. 먼저 도메인을 등록하세요",
      });
    }

    const token = jwt.sign(
      {
        id: domain.User.id,
        nick: domain.User.nick,
      },
      process.env.JWT_SECRETKEY,
      {
        expiresIn: "1m",
        issuer: "nodebird",
      }
    );

    return res.json({
      code: 200,
      message: "토큰 발급 완료",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      code: 401,
      message: "토큰 발급 실패",
    });
  }
};

exports.tokenTest = async (req, res, next) => {
  console.log("토큰 테스트시", res.locals.decoded);
  res.json(res.locals.decoded);
};

exports.getMyPosts = (req, res, next) => {
  Post.findAll({ where: { userId: res.locals.decoded.id } })
    .then((posts) => {
      res.json({ code: 200, payload: posts });
    })
    .catch((error) => {
      return res.status(500).json({
        code: 500,
        message: "서버 에러",
      });
    });
};

exports.getPostsByHashtag = async (req, res, next) => {
  try {
    const hashtag = await Hashtag.findOne({
      where: { title: req.params.title },
    });
    console.log("!!!", hashtag);
    if (!hashtag) {
      return res.status(404).json({
        code: 404,
        message: "검색 결과 없음",
      });
    }

    const posts = await hashtag.getPosts();
    console.log("~~~", posts);
    if (posts.length === 0) {
      return res.status(404).json({
        code: 404,
        message: "검색 결과 없음",
      });
    }
    return res.json({
      code: 200,
      payload: posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};
