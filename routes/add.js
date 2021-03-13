const { adminMiddleware, requireSignin } = require("../middlewares");
const User = require("../models/user");
const Conversation = require("../models/conversation");

const express = require("express");

const router = express.Router();

router.post("/add", requireSignin, adminMiddleware, (req, res) => {
  const roomId = req.body.roomId;
  User.find({})
    .then((users) => {
      users.map((user) => {
        const condition = {
          _id: roomId,
        };
        const update = {
          $push: {
            participants: {
              id: user._id,
            },
          },
        };
        Conversation.findOneAndUpdate(condition, update).exec((error, room) => {
          if (error) {
            return res.status(400).json(error);
          }
          if (room) {
            console.log(room);
          }
        });
      });
      return res.status(200).json({ message: "Added to room", roomId });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ err });
    });
});

router.get("/allusers", requireSignin, adminMiddleware, (req, res) => {
  User.find({})
    .then((users) => {
      var userEmail = [];
      users.map((user) => {
        userEmail.push(user);
      });
      return res.status(200).json({ userData: userEmail });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ err });
    });
});

router.post("/addremaining", requireSignin, adminMiddleware, (req, res) => {
  const roomId = req.body.roomId;
  const userId = req.body.userId;
  const userName = req.body.userName;
  User.find({_id: userId})
    .then((users) => {
      users.map((user) => {
        Conversation.findOne({ _id: roomId }).exec((error, room) => {
          if (error) {
            return res.status(400).json(error);
          }
          if (room) {
            const userExists = room.participants.find((u) => u.id == user._id);
            if (userExists) {
              console.log(`User with ${user._id} is in room`);
            } else {
              const condition = {
                _id: roomId,
              };
              const update = {
                $push: {
                  participants: {
                    $each: [{ id: userId }, { info: { id: userId, name: userName } }],
                  },
                },
              };
              Conversation.findByIdAndUpdate(condition, update).exec(
                (error, _room) => {
                  if (error) return res.status(400).json({ error });
                  if (_room) {
                    console.log(`added to ${_room}`);
                  }
                }
              );
            }
          }
        });
      });
      return res.status(200).json({ message: "Added to room", roomId });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ err });
    });
});

router.get(
  "/addnamesinconversation",
  requireSignin,
  adminMiddleware,
  (req, res) => {
    Conversation.find({})
      .then((chatRooms) => {
        chatRooms.map((chatRoom) => {
          chatRoom.participants.forEach((participant) => {
            User.findOne({ _id: participant.id })
              .then((user) => {
                const condition = {
                  _id: chatRoom._id,
                };
                const update = {
                  $push: {
                    participants: {
                      info: {
                        id: user._id,
                        name: user.fullName,
                      },
                    },
                  },
                };
                Conversation.findOneAndUpdate(condition, update).exec(
                  (error, room) => {
                    if (error) {
                      return res.status(400).json({ error });
                    }
                    console.log(room);
                  }
                );
              })
              .catch((error) => {
                return res.status(400).json({ error });
              });
          });
        });
        return res.status(200).json({ message: "Successfully updated names" });
      })
      .catch((error) => {
        return res.status(400).json({ error });
      });
  }
);

module.exports = router;
