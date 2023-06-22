jest.mock("../models/user");
const User = require("../models/user");
const { follow } = require("./user");

describe("follow", () => {
  test("사용자를 찾으면 팔로잉을 추가하고 success를 응답", async () => {
    User.findOne.mockReturnValue({
      addFollowing() {
        return Promise.resolve(true);
      },
    }); // user
    const result = await follow(1, 2);

    expect(result).toBe("ok");
  });

  test("사용자를 못 찾으면 팔로잉을 추가하고 res.status(404).send(no user) 호출", async () => {
    User.findOne.mockReturnValue(null); // user

    const result = await follow(1, 2);

    expect(result).toBe("no user");
  });

  test("DB에서 에러 발생 시 next(error) 호출", async () => {
    const message = "DB에러";
    const result = User.findOne.mockReturnValue(Promise.reject(message)); // user
    await follow(1, 2);

    expect(result).toBe(message); // 에러를 어떻게 발생시키지..?
  });
});
