const Post = require("../models/post");
const Hashtag = require("../models/hashtag");
exports.afterUploadImage = (req, res) => {
  console.log("req.file::", req.file);
  res.json({ url: `/img/${req.file.filename}` });
};

exports.uploadPost = async (req, res, next) => {
  // req.body.content
  try {
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    });

    // /#[^\s#]*/g => 태그에 대한 정규표현식
    const hashtags = req.body.content.match(/#[^\s#]*/g);

    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((hashtag) => {
          return Hashtag.findOrCreate({
            where: {
              title: hashtag.slice(1).toLowerCase(),
            },
          });
        })
      );

      console.log("result ::", result);
      await post.addHashtags(result.map((el) => el[0]));
    }
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
};
