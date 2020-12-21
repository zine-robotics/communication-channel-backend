const { createRoom, joinRoom } = require("../controllers/chat");
const { requireSignin } = require("../middlewares");
const Conversation = require("../models/conversation");

express = require("express");
const router = express.Router();

router.post("/createroom", requireSignin, createRoom);
router.post("/joinroom", requireSignin, joinRoom);

module.exports = router;
