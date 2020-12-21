const { createRoom } = require("../controllers/chat");
const { requireSignin } = require("../middlewares");

express = require("express");
const router = express.Router();

router.post("/createChatRoom", requireSignin, createRoom);

module.exports = router;
