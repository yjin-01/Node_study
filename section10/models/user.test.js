// 의미있는 테스트 아님!! -> 테스트 커버리지를 위한 테스트 코드

const User = require("../models/user");

describe("User model", () => {
  test("static initiate 호출", () => {
    const sequelize = jest.fn();
    expect(User.initiate(sequelize)).toBe(undefined);
  });

  test("static associate 호출", () => {
    const db = {
      User: {
        hasMany: jest.fn(),
        belongsToMany: jest.fn(),
      },
      Post: {},
    };
    User.associate(db);
    expect(db.User.hasMany).toBeCalledWith(db.Post);
    expect(db.User.belongsToMany).toHaveBeenCalledTimes(2);
  });
});
