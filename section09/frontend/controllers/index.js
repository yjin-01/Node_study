const axios = require("axios");

const URL = process.env.API_URL;

axios.defaults.headers.origin = process.env.ORIGIN;

// 공통 기능
const request = async (req, api) => {
  try {
    if (!req.session.jwt) {
      const tokenResult = await axios.post(`${URL}/token`, {
        clientSecret: process.env.CLIENT_SECRET,
      });

      req.session.jwt = tokenResult.data.token;
    }

    return await axios.get(`${URL}${api}`, {
      headers: { authorization: req.session.jwt },
    });
  } catch (error) {
    if (error.response?.status === 419) {
      delete req.session.jwt; // 만료시 토큰 삭제
      return request(req, api); // 재귀함수로 재요청
    }
    throw error.response;
    // return인 경우는 에러가 없기 때문에 res.json()으로 전달
    // throw인 경우 바로 catch로 전달되고 에러처리 미들웨어 전달 후
  }
};

exports.getMyPosts = async (req, res, next) => {
  try {
    const result = await request(req, "/posts/my");
    res.json(result.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.searchByHasgtag = async (req, res, next) => {
  try {
    console.log("====", req.params.hashtag);
    const result = await request(
      req,
      `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}` // 주소에서 한글 인식 못함
    );
    res.json(result.data);
  } catch (error) {
    next(error);
  }
};

exports.renderMain = (req, res) => {
  res.render("main", { key: process.env.CLIENT_SECRET });
};

/////////////
////////////
exports.test = async (req, res, next) => {
  try {
    if (!req.session.jwt) {
      // 토큰 발급 후 세션 쿠키에 저장
      const tokenResult = await axios.post("http://localhost:3001/v1/token", {
        clientSecret: process.env.CLIENT_SECRET,
      });

      if (tokenResult.data?.code === 200) {
        req.session.jwt = tokenResult.data.token;
        return res.json(tokenResult.data);
      } else {
        return res.status(tokenResult.data?.code).json(tokenResult.data);
      }
    }

    // 토큰 테스트

    const result = await axios.get("http://localhost:3001/v1/test", {
      headers: { authorization: req.session.jwt },
    });

    return res.json(result.data);
  } catch (error) {
    console.error(error);

    if (error.response?.status === 419) {
      return res.json(error.response.data);
    }
    next(error);
  }
};
