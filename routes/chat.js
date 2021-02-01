const {
  createRoom,
  joinRoom,
  getRooms,
  getMessages,
  getDmRoom
} = require("../controllers/chat");
const { requireSignin, adminMiddleware } = require("../middlewares");
const Conversation = require("../models/conversation");

express = require("express");
const router = express.Router();

router.post("/createroom", requireSignin, adminMiddleware, createRoom);
router.post("/joinroom", joinRoom);
router.post("/rooms", requireSignin, getRooms);
router.post("/messages", requireSignin, getMessages);
router.get("/checkroom", requireSignin, getDmRoom);

module.exports = router;
