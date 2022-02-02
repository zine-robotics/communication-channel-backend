const {
  createRoom,
  joinRoom,
  getRooms,
  getMessages,
  getDmRoom,
  sendPhoto,
} = require("../controllers/chat");
const { requireSignin, adminMiddleware } = require("../middlewares");

const express = require("express");
const router = express.Router();

router.post("/createroom", requireSignin, adminMiddleware, createRoom);
router.post("/joinroom", joinRoom);
router.post("/rooms", requireSignin, getRooms);
router.post("/messages", requireSignin, getMessages);
router.post("/sendphoto", requireSignin, sendPhoto);
router.get("/checkroom", requireSignin, getDmRoom);

module.exports = router;
