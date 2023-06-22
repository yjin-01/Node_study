const Hashtag = require("../models/hashtag");
const Post = require("../models/post");
const User = require("../models/user");

exports.renderProfile = (req, res) => {
  res.render("profile", { title: "내 정보 - NodeBird" });
};

exports.renderJoin = (req, res) => {
  res.render("join", { title: "회원가입 - NodeBird" });
};

exports.renderMain = async (req, res, next) => {
  try {
    const twits = [];

    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ["id", "nick"],
      },
      order: [["createdAt", "DESC"]],
    });

    res.render("main", {
      title: "NodeBird",
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.renderHashtag = async (req, res, next) => {
  const query = req.query.hashtag;

  if (!query) {
    return res.redirect("/");
  }

  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    console.log("hashtag", hashtag);
    if (hashtag) {
      posts = await hashtag.getPosts({
        include: [
          {
            model: User,
            attributes: ["id", "nick"],
          },
        ],
        order: [["createdAt", "DESC"]],
      });
    }
    console.log("hashtag", posts);

    res.render("main", {
      title: `${query} | NodeBird`,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 라우터 -> 컨트롤러 -> 서비스
// 컨트롤러 => 요청과 응답이 무엇인지 알고있음
// 서비스는 알수 없음
