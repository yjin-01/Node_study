// jest.mock("../models/user");
// const User = require("../models/user");
// const { follow } = require("./user");

// describe("follow", () => {
//   const req = { user: { id: 1 }, params: { id: 2 } };
//   const res = { status: jest.fn(() => res), send: jest.fn() };
//   const next = jest.fn();

//   test("사용자를 찾으면 팔로잉을 추가하고 success를 응답", async () => {
//     User.findOne.mockReturnValue({
//       addFollowing() {
//         return Promise.resolve(true);
//       },
//     }); // user
//     await follow(req, res, next);

//     expect(res.send).toBeCalledWith("success");
//   });

//   test("사용자를 못 찾으면 팔로잉을 추가하고 res.status(404).send(no user) 호출", async () => {
//     User.findOne.mockReturnValue(null); // user

//     await follow(req, res, next);
//     expect(res.status).toBeCalledWith(404);
//     expect(res.send).toBeCalledWith("no user");
//   });

//   test("DB에서 에러 발생 시 next(error) 호출", async () => {
//     const message = "DB에러";
//     User.findOne.mockReturnValue(Promise.reject(message)); // user
//     await follow(req, res, next);

//     expect(next).toBeCalledWith(message); // 에러를 어떻게 발생시키지..?
//   });
// });
