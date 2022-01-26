const User = require("../../models/user");
const Conversation = require("../../models/conversation");
exports.readUser = async (req, res) => {
  console.log("read new User",req.body.email);
  try {
    const user = await User.findOne({
        email: req.body.email,
      });
    console.log(user)
    
    res.status(200).json({ data: {_id:user._id,fullName:user.fullName,email:user.email,rollNumber:user.rollNumber,role:user.role,college:user.college} });
  } catch (err) {
    console.log("error",err)
    res
      .status(123)
      .json({ status: "User with this email already exists. Update record instead" });
  }
};


exports.readRoom = async (req, res) => {
  console.log("read new room",req.body);
  try {
    const room = await Conversation.findOne({
        conversationName: req.body.email,
      });
    console.log("room",[room.participants]);
    
    res.status(200).json({ data: {_id:room._id, conversationName: room.conversationName,participants:room.participants} });
  } catch (err) {
    console.log("error",err)
    res
      .status(123)
      .json({ status: "User with this email already exists. Update record instead" });
  }
};
