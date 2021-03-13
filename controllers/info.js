const User = require("../models/user");
const ObjectId = require("mongodb").ObjectId;

exports.userInfo = async (req, res) => {
  const _userId = req.query.userId;
  const userId = new ObjectId(_userId);
  User.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "No user exists" });
      } else {
        return res.status(200).json({
          user: {
            role: user.role,
            college: user.college,
            domainOfInterest: user.domainOfInterest,
            _id: user._id,
            fullName: user.fullName,
            rollNumber: user.rollNumber,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ error });
    });
};
