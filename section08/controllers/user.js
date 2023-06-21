const User = require("../models/user");

exports.follow = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
    });
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send("success");
    } else {
      res.status(404).send("no user");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.unfollow = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
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
    });

    console.log("user", user.Followers);

    console.log("========");
    console.log("follow", user.Followings);
    if (user) {
      const a = await user.removeFollowing(parseInt(req.params.id, 10));

      console.log("성공?", a);
      res.redirect("/");
    }
  } catch (error) {
    console.error(error);

    next(error);
  }
};
