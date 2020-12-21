const Conversation = require("../models/conversation");

exports.createRoom = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
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

exports.joinRoom = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ message: "Invalid request to join chatroom" });
  }
  const { roomId, userId } = req.body;
  Conversation.findOne({ _id: roomId }).exec((error, room) => {
    if (error) return res.status(400).json({ error });
    if (room) {
      userExists = room.participants.find((u) => u.id == userId);
      if (userExists) {
        return res
          .status(400)
          .json({ message: "User already exists in that chatroom" });
      } else {
        const condition = { _id: roomId };
        const update = {
          $push: {
            participants: { id: userId },
          },
        };
        Conversation.findOneAndUpdate(condition, update).exec(
          (error, _room) => {
            if (error) return res.status(400).json({ error });
            if (_cart) return res.status(200).json({ room: _room });
          }
        );
      }
    } else
      return res
        .status(400)
        .json({ message: "No room exist. Please create room first." });
  });
};
