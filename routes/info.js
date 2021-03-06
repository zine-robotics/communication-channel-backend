const { userInfo } = require("../controllers/info");
const { requireSignin } = require("../middlewares");
const express = require("express");

const router = express.Router();

router.get("/user", requireSignin, userInfo);

module.exports = router;
