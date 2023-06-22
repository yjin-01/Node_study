const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../models");

// 모든 테스트 실행 전에 한번만 실행
beforeAll(async () => {
  db = await sequelize.sync({ force: true });
});

// beforeEach(() => {}); // 각 테스트 전 마다 실행

describe("POST /join", () => {
  test("회원가입", (done) => {
    request(app)
      .post("/auth/join")
      .send({
        email: "aaa@aaa.com",
        password: "1234",
        nick: "jini",
      })
      .expect("Location", "/")
      .expect(302, done);
  });

  test("이미 가입된 회원인 경우", (done) => {
    request(app)
      .post("/auth/join")
      .send({
        email: "aaa@aaa.com",
        password: "1234",
        nick: "jini",
      })
      .expect("Location", "/join?error=exist")
      .expect(302, done);
  });
});

describe("POST /join", () => {
  const agent = request.agent(app); // 같은 앱을 사용하기 위한 코드
  beforeEach((done) => {
    //로그인
    agent
      .post("/auth/login") // app에 요청
      .send({
        email: "aaa@aaa.com",
        password: "1234",
      })
      .end(done);
  });

  test("로그인한 상태에서 회원가입하는 경우 에러 발생", (done) => {
    const message = encodeURIComponent("로그인한 상태입니다.");
    agent
      .post("/auth/join")
      .send({
        email: "ccc@ccc.com",
        password: "1234",
        nick: "jini",
      })
      .expect("Location", `/?error=${message}`)
      .expect(302, done);
  });
});

describe("POST /login", () => {
  test("로그인 수행", (done) => {
    // 비동기이지만 프로미스가 아닌 경우 jest에게 끝남을 알려주어야함
    request(app)
      .post("/auth/login") // app에 요청
      .send({
        email: "aaa@aaa.com",
        password: "1234",
      })
      .expect("Location", "/") // 응답헤더에
      .expect(302, done); //  test가 끝났음을 알려줌
  });

  test("가입되지 않은 회원인 경우 에러 발생", (done) => {
    const message = encodeURIComponent("가입되지 않은 회원입니다.");
    request(app)
      .post("/auth/login")
      .send({
        email: "zzz@aaa.com",
        password: "1234",
      })
      .expect("Location", `/?error=${message}`)
      .expect(302, done);
  });

  test("비밀번호 틀린 경우 에러 발생", (done) => {
    const message = encodeURIComponent("비밀번호가 일치하지 않습니다.");
    request(app)
      .post("/auth/login")
      .send({
        email: "aaa@aaa.com",
        password: "12345",
      })
      .expect("Location", `/?error=${message}`)
      .expect(302, done);
  });
});

describe("GET /logout", () => {
  test("로그인 안한 경우에는 에러", async () => {
    const result = await request(app).get("/auth/logout");

    expect(result.status).toBe(403);
    expect(result.text).toBe("로그인 필요");
  });
});

describe("GET /logout", () => {
  const agent = request.agent(app);

  beforeEach((done) => {
    //로그인
    agent
      .post("/auth/login")
      .send({
        email: "aaa@aaa.com",
        password: "1234",
      })
      .end(done);
  });

  test("로그아웃 완료 시 redirect /", (done) => {
    agent.get("/auth/logout").expect("Location", "/").expect(302, done);
  });
});

afterAll(async () => {
  await sequelize.close();
}); // 모든 테스트가 끝나고 난 후 한번만 실행
