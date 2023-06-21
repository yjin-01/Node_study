const Sequelize = require("sequelize");

const User = require("./user");

class Domain extends Sequelize.Model {
  static initiate(sequelize) {
    Domain.init(
      {
        host: {
          type: Sequelize.STRING(80),
          allowNull: false,
        },
        type: {
          type: Sequelize.ENUM("free", "premiun"),
          allowNull: false,
        },
        clientSecret: {
          type: Sequelize.UUID,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        modelName: "Domain",
        tableName: "domains",
      }
    );
  }
  static associate(db) {
    db.Domain.belongsTo(db.User);
  }
}

module.exports = Domain;
