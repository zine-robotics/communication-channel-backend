const User = require("../../models/user");
const Conversation = require("../../models/conversation");
const Messages = require("../../models/message");


exports.deleteUser = async (req, res) => {
  console.log("read new User",req.body.email);
  try {
    await User.deleteOne({
        email: req.body.email,
      });
    console.log('Deleted');
    
    res.status(200).json();
  } catch (err) {
    console.log("error",err)
    res
      .status(234)
      .json({ status: "User with this email already exists. Update record instead" });
  }
};

exports.deleteConversation = async (req, res) => {
    console.log("read new room",req.body.conversationId);
    try {
      await Conversation.deleteOne({
          conversationName: req.body.conversationId,
        });
      console.log('Deleted');
      
      res.status(200).json();
    } catch (err) {
      console.log("error",err)
      res
        .status(234)
        .json();
    }
  };

  exports.deleteMessages = async (req, res) => {
    console.log("read new room",req.body.conversationId);
    try {
      await Messages.deleteMany({
          conversationId: req.body.conversationId,
        });
      console.log('Deleted');
      
      res.status(200).json();
    } catch (err) {
      console.log("error",err)
      res
        .status(234)
        .json();
    }
  };


