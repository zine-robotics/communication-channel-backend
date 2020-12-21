const Conversation = require("../models/conversation");

exports.createRoom = (req, res) => {
  if (!req.body) {
    return res
      .status(200)
      .json({ mesaage: "Invalid request to create chat room" });
  }
  const { conversationName } = req.body;
  _chatRoom = new Conversation(conversationName);
  _chatRoom.save((error, data) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ message: "Failed to create chat room" });
    }

    if (data) {
      res.status(200).json({ message: "Succesfully created chatroom" });
    }
  });
};
