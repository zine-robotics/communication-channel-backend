const cloudinary = require('cloudinary').v2;

const Conversation = require("../models/conversation");
const Message = require("../models/message");
const ObjectId = require("mongodb").ObjectId;

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true 
});

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
        const _chatRoom = new Conversation({
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
  console.log(req.body)
  if (!req.body) {
    return res.status(400).json({
      message: "Invalid request to join chatroom",
    });
  }
  const { roomID, userID } = req.body;
  console.log(roomID);
  Conversation.findOne({
    _id: roomID,
  }).exec((error, room) => {
    if (error){
    console.log("therw ws an error")
      return res.status(400).json({
        error,
      });}
    if (room) {
      console.log("found room");
      const userExists = room.participants.find((u) => u.id == userID);
      if (userExists) {
        console.log("therw adaws an error")

        return res.status(400).json({
          message: "User already exists in that chatroom",
        });
      } else {
        const condition = {
          _id: roomID,
        };
        // const update = {
        //   $push: {
        //     participants: {
        //       id: userId,
        //     },
        //     participants: {
        //       info: {
        //         id: userId,
        //         name: userName,
        //       },
        //     },
        //   },
        // };
        const update = {
          $push: {
            participants: {
              $each: [{ id: userID }, { info: { id: userID, name: "userName" } }],
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
    } else{
      console.log("no room")
      return res.status(400).json({
        message: "No room exist. Please create room first.",
      });}
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
    return res.status(400).json({
      error,
    });
  }
};

exports.getMessages = async (req, res) => {
  if (!req.body.roomId) {
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
    return res.status(400).json({
      error,
    });
  }
};

exports.sendPhoto = async(req, res) => {
  if(!req.files.photo) {
    return res.status(400).json({
      message: "No photo selected!"
    })
  }

  const file = req.files.photo;
  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    return res.status(201).json({ url: result.url })
  })
}

exports.getDmRoom = async (req, res) => {
  if (!req.query) {
    return res.status(400).json("Invalid Request to get Roomid");
  }
  const firstUserId = new ObjectId(req.query.userId);
  const firstUserName = req.query.firstUserName;
  const secondUserId = new ObjectId(req.user._id);
  const secondUserName = req.query.secondUserName;
  const condition = {
    $and: [
      {
        "participants.id": firstUserId,
      },
      {
        "participants.id": secondUserId,
      },
    ],
  };
  try {
    const rooms = await Conversation.find(condition);
    console.log("one", rooms);
    const roomsHavingParticipants = rooms.filter(
      (room) => room.participants.length === 4
    );
    console.log("two", roomsHavingParticipants);
    if (roomsHavingParticipants.length > 0) {
      return res.json({
        exists: true,
        room: roomsHavingParticipants[0],
      });
    } else {
      const conversationName = firstUserName + "," + secondUserName;
      const chatRoom = new Conversation({
        conversationName,
        participants: [
          { id: firstUserId },
          { id: secondUserId },
          { info: { id: firstUserId, name: firstUserName } },
          { info: { id: secondUserId, name: secondUserName } },
        ],
      });
      const room = await chatRoom.save();
      return res.json({
        exists: false,
        room,
      });
    }
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};
