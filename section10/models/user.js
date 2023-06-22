const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },

        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },

        provider: {
          type: Sequelize.ENUM("local", "kakao"),
          allowNull: false,
          defaultValue: "local",
        },

        snsId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },

      {
        // validation => 검증 기능
        sequelize,
        timestamps: true, // createdAt, updatedAt
        underscored: false,
        modelName: "User", // 자바스크립트에서 사용하는 이름
        talbleName: "users", // DB에서 사용하는 이름
        paranoid: true, // deletedAt  유저 삭제날짜(softDelete 구현 가능)
        charset: "utf8", // DB에 저장될 문자 형식 이모티콘은 utf8mb4
        collate: "utf8_general_ci", // 저장된 문자 정렬 방식
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.User, {
      // 팔로워(팔로잉의 아이디로 팔로우한 사람 찾기)
      foreignKey: "followingId",
      as: "Followers",
      through: "Follow",
    });
    db.User.belongsToMany(db.User, {
      // 팔로잉(내 아이디로 내가 팔로잉하는 사람 찾기)
      foreignKey: "followerId",
      as: "Followings",
      through: "Follow",
    });
  }
}

module.exports = User;
