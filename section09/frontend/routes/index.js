const express = require("express");
const {
  test,
  getMyPosts,
  searchByHasgtag,
  renderMain,
} = require("../controllers");
const router = express.Router();

// router.get("/test", test);

router.get("/myposts", getMyPosts);
router.get("/search/:hashtag", searchByHasgtag);
router.get("/", renderMain);

module.exports = router;
