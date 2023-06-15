const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        // 컬럼 정의
        name: {
          type: Sequelize.STRING(20),
          allowNull: false, // not null
          unique: true,
        },
        age: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        married: {
          type: Sequelize.BOOLEAN, // mysql에서는 tinyint
          allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE, // => mysql datetime // mysql date => sequlize dataonly
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        // 모델에 대한 설정
        sequelize,
        timestamps: false, //  true시 createdAt, updateAt 추가
        underscored: false, // camel_case or snack_case
        modelName: "User",
        tableName: "users",
        paranoid: false, // true시 deletedAt 까지 추가(softdelete 구현 가능)
        charset: "utf8", // uft8mb4는 이모티콘까지 사용 가능
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Comment, { foreignKey: "commenter", soureKey: "id" });
  }
}

module.exports = User;
