const { createRoom, joinRoom } = require("../controllers/chat");
const { requireSignin } = require("../middlewares");
const Conversation = require("../models/conversation");

express = require("express");
const router = express.Router();

router.post("/createChatRoom", requireSignin, createRoom);
router.post("/joinChatRoom", requireSignin, joinRoom);

module.exports = router;
