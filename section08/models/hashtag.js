const Sequelize = require("sequelize");

class Hashtag extends Sequelize.Model {
  static initiate(sequelize) {
    Hashtag.init(
      {
        title: {
          type: Sequelize.STRING(15),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Hashtag",
        tableName: "hashtags",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static assocaite(db) {
    db.Hashtag.belongToMany(db.Post, { through: "PostHashtag" }); // db.sequelize.models.Posthashtag로 직접 접근 가능
  }
}

module.exports = Hashtag;
