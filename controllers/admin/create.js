const User = require("../../models/user");
const Message = require("../../models/message");

exports.createUser = async (req, res) => {
  console.log("creating new User",req.body.fullName);
  try {
    await User.create({
    fullName: req.body.name,
      email: req.body.email,
      role: req.body.role,
      rollNumber: req.body.rollNumber,
      college: req.body.college,
      password: req.body.password,
    });
    console.log("user created")
    res.status(200).json({ status: "User Created" });
  } catch (err) {
      console.log(err);
    res.status(234).json({ status: "User with this email already exists. Update record instead" });
  }
};


exports.createMessage = async (req, res) => {
  console.log("creating new User",req.body);
  try {
    await Message.create({
    senderId: req.body.senderId,
      content: req.body.contentemail,
      conversationId: req.body.conversationId,
      senderName: req.body.senderName,
    });
    console.log("user created")
    res.status(200).json({ status: "User Created" });
  } catch (err) {
      console.log(err);
    res.status(234).json({ status: "User with this email already exists. Update record instead" });
  }
};
