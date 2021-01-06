const Conversation = require("../models/conversation");
const Message = require("../models/message");
const ObjectId = require("mongodb").ObjectId;

exports.createRoom = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      mesaage: "Invalid request to create chat room",
    });
  }
  const { conversationName } = req.body;
  if (conversationName) {
    Conversation.findOne({
      conversationName,
    }).exec((error, room) => {
      if (error)
        return res.status(400).json({
          error,
        });
      if (room)
        return res.status(400).json({
          message: "Room already exists",
        });
      else {
        _chatRoom = new Conversation({
          conversationName,
        });
        _chatRoom.save((error, data) => {
          if (error) {
            console.log(error);
            return res.status(400).json({
              message: "Failed to create chat room",
            });
          }

          if (data) {
            res.status(200).json({
              message: "Succesfully created chatroom",
            });
          }
        });
      }
    });
  }
};

exports.joinRoom = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Invalid request to join chatroom",
    });
  }
  const { roomId, userId } = req.body;
  Conversation.findOne({
    _id: roomId,
  }).exec((error, room) => {
    if (error)
      return res.status(400).json({
        error,
      });
    if (room) {
      userExists = room.participants.find((u) => u.id == userId);
      if (userExists) {
        return res.status(400).json({
          message: "User already exists in that chatroom",
        });
      } else {
        const condition = {
          _id: roomId,
        };
        const update = {
          $push: {
            participants: {
              id: userId,
            },
          },
        };
        Conversation.findOneAndUpdate(condition, update).exec(
          (error, _room) => {
            if (error)
              return res.status(400).json({
                error,
              });
            if (_room)
              return res.status(200).json({
                room: _room,
              });
          }
        );
      }
    } else
      return res.status(400).json({
        message: "No room exist. Please create room first.",
      });
  });
};

exports.getRooms = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Invalid request to create chat room",
    });
  }
  const userId = req.body.userId;
  try {
    const chats = await Conversation.find({
      "participants.id": userId,
    });
    if (!chats) {
      return res.status(400).json({
        message: "Couldn't find any chats for that user",
      });
    } else {
      return res.status(200).json({
        chats,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

exports.getMessages = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Invalid request to get messages",
    });
  }
  const _roomId = req.body.roomId;
  const roomId = new ObjectId(_roomId);
  try {
    const messages = await Message.find({
      conversationId: roomId,
    });
    if (!messages) {
      return res.status(400).json({
        message: "No Messages",
      });
    } else {
      return res.status(200).json({
        messages,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};
