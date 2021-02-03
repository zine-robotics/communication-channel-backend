const { adminMiddleware, requireSignin } = require("../middlewares");
const Message = require("../models/message");
const User = require("../models/user");
const Conversation = require("../models/conversation");
const conversation = require("../models/conversation");

express = require("express");

const router = express.Router();

router.get("/deletemessages", requireSignin, adminMiddleware, (req, res) => {
  Message.deleteMany({})
    .then((data) => {
      console.log(data);
      return res.status(200).json({ message: "Deleted All Messages", data });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ err });
    });
});

router.get("/deleteuser", requireSignin, adminMiddleware, (req, res) => {
  User.deleteMany({})
    .then((data) => {
      console.log(data);
      return res.status(200).json({ message: "Deleted All User", data });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ err });
    });
});

router.get(
  "/deleteusersfromroom",
  requireSignin,
  adminMiddleware,
  (req, res) => {
    Conversation.updateMany({}, {"$set": {"participants": []}})
      .then((data) => {
          console.log("delete users array")
        return res.status(200).json({data})
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ err });
      });
  }
);

module.exports = router;
