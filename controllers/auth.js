const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) {
      console.log(error);
    }

    if (user)
      return res
        .status(422)
        .json({ message: "User with that email already exist" });
    else {
      const {
        fullName,
        email,
        password,
        rollNumber,
        college,
      } = req.body;

      const _user = new User({
        fullName,
        email,
        password,
        rollNumber,
        college,
      });

      _user.save((error, data) => {
        if (error) {
          console.log(error);
          return res.status(403).json({ error: "Something went wrong" });
        }

        if (data) {
          return res.status(200).json({
            message: "Registration Successful",
            data
          });
        }
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "365d" }
        );
        const {
          _id,
          fullName,
          email,
          role,
          rollNumber,
          college,
        } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            fullName,
            email,
            role,
            rollNumber,
            college,
          },
        });
      } else {
        return res.status(401).json({
          message: "Invalid Password",
        });
      }
    } else {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }
  });
};
