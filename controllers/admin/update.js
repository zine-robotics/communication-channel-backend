const User = require("../../models/user");
const Conversation = require("../../models/conversation");

exports.updateUser = async (req, res) => {
    console.log("update new User",req.body.email);
    try {
      await User.updateOne(
          {email: req.body.email},{ $set:req.body.data}
        );
      console.log(req.body.data)
      const user = await User.findOne({
        email: req.body.email,
      });
    res.status(200).json({status: 'ok'});
    } catch (err) {
      console.log("error",err)
      res
        .status(123)
        .json({ status: "User with this email already exists. Update record instead" });
    }
};


exports.updateRoom = async (req, res) => {
  console.log("update new User",req.body);
  try {
    await Conversation.updateOne(
        {conversationName: req.body.email},{ $set:req.body.data}
      );
    console.log(req.body.data)
    const user = await Conversation.findOne({
      _id: req.body.data._id,
    });

    console.log(user);
  res.status(200).json({status: 'ok'});
  } catch (err) {
    console.log("error",err)
    res
      .status(123)
      .json({ status: "User with this email already exists. Update record instead" });
  }
};