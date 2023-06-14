const express = require("express");

const router = express.Router();

// GET /user 라우터
router.get("/", (req, res) => {
  // GET /user/ 주소가 합쳐짐
  res.send("Hello, User");
});

module.exports = router;
