const { createRoom, joinRoom } = require("../controllers/chat");
const { requireSignin } = require("../middlewares");
const Conversation = require("../models/conversation");

express = require("express");
const router = express.Router();

router.post("/createroom", requireSignin, createRoom);
router.post("/joinroom", requireSignin, joinRoom);
router.get("/rooms", requireSignin, (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ mesaage: "Invalid request to create chat room" });
  }
  const userId = req.body.userId;
  const chats = Conversation.find({"participants.id": userId})
  if(!chats) {
      return res.status(400).json({message: "Couldn't find any chats for that user"})
  } else {
      return res.status(200).json({chats})
  }
});

module.exports = router;
