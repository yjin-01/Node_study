const Domain = require("../models/domain");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");

exports.renderLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user?.id || null }, // undefined인 상황 방지
      include: { model: Domain },
    });

    res.render("login", {
      user,
      domains: user?.Domains,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.createDomain = async (req, res, next) => {
  try {
    console.log("host:", req.body.host);
    console.log("type:", req.body.type);
    await Domain.create({
      UserId: req.user.id,
      host: req.body.host,
      type: req.body.type,
      clientSecret: uuidv4(),
    });

    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
};
