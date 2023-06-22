const { isLoggedIn, isNotLoggedIn } = require("./");

describe("isLoggedIn", () => {
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  };

  const next = jest.fn(); // jest가 추적하는 함수

  test("로그인되어 있으면 isLoggiedIn이 next 호출", () => {
    const req = {
      isAuthenticated: jest.fn(() => true),
    };

    isLoggedIn(req, res, next);
    expect(next).toBeCalledTimes(1); // 1번 호출
  });

  test("로그인되어 있지 않으면 isLoggiedIn이 에러 응답", () => {
    const req = {
      isAuthenticated: jest.fn(() => false),
    };

    isLoggedIn(req, res, next);
    expect(res.status).toBeCalledWith(403); // 매개변수 검증
    expect(res.send).toBeCalledWith("로그인 필요");
  });
});

describe("isNotLoggedIn", () => {
  const res = {
    redirect: jest.fn(),
  };
  const next = jest.fn(); // jest가 추적하는 함수

  test("로그인되어 있으면 isNotLoggedIn next 호출", () => {
    const res = {
      redirect: jest.fn(),
    };
    const req = {
      isAuthenticated: jest.fn(() => true),
    };

    isNotLoggedIn(req, res, next);

    expect(res.redirect).toBeCalledWith(
      `/?error=${encodeURIComponent("로그인한 상태입니다.")}`
    ); // 매개변수 검증
  });

  test("로그인되어 있지 않으면 isNotLoggedIn 에러 응답", () => {
    const req = {
      isAuthenticated: jest.fn(() => false),
    };

    isNotLoggedIn(req, res, next);
    expect(next).toBeCalledTimes(1); // 1번 호출
  });
});
