const User = require("../models/user");

// 요청과 응답에 대해서 알 수 없도록 서비스 제작
exports.follow = async (userId, followingId) => {
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (user) {
      await user.addFollowing(parseInt(followingId, 10));
      return "ok";
    } else {
      return "no user";
    }
  } catch (error) {
    return "DB에러";
  }
};
