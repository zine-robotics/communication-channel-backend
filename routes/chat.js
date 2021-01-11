const {
  createRoom,
  joinRoom,
  getRooms,
  getMessages,
} = require("../controllers/chat");
const { requireSignin, adminMiddleware } = require("../middlewares");
const Conversation = require("../models/conversation");

express = require("express");
const router = express.Router();

router.post("/createroom", requireSignin, adminMiddleware, createRoom);
router.post("/joinroom", joinRoom);
router.post("/rooms", requireSignin, getRooms);
router.post("/messages", requireSignin, getMessages);

module.exports = router;
