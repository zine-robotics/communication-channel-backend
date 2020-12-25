const { createRoom, joinRoom, getRooms } = require("../controllers/chat");
const { requireSignin } = require("../middlewares");
const Conversation = require("../models/conversation");

express = require("express");
const router = express.Router();

router.post("/createroom", requireSignin, createRoom);
router.post("/joinroom", requireSignin, joinRoom);
router.get("/rooms", requireSignin, getRooms);

module.exports = router;
