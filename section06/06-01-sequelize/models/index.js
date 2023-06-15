const Sequelize = require("sequelize"); //시퀄라이즈 객체

const User = require("./user");
const Comment = require("./comment");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

const db = {};

// 연결객체
const sequelize = new Sequelize(
  config.database,
  config.usermane,
  config.password,
  config
);

db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;

// 모델과 MySQL연결
User.initiate(sequelize);

Comment.initiate(sequelize);

User.associate(db);
Comment.associate(db);

module.exports = db;

// mysql2 드라이버 이용해서
// mysql, sequelize, node 연결해주는 코드
