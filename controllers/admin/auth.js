const User = require("../../models/user");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res
        .status(400)
        .json({ message: "User with that email already exist" });
    else {
      const {
        fullName,
        email,
        password,
        rollNumber,
        domainOfInterest,
      } = req.body;

      const _user = new User({
        fullName,
        email,
        password,
        role: "admin",
        rollNumber,
        domainOfInterest,
      });

      _user.save((error, data) => {
        if (error) {
          console.log(error);
          return res.status(400).json({ error: "Something went wrong" });
        }

        if (data) {
          return res.status(200).json({
            message: "Registration Successful",
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
      if (user.authenticate(req.body.password) && user.role === "admin") {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        const {
          _id,
          fullName,
          email,
          role,
          rollNumber,
          domainOfInterest,
        } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            fullName,
            email,
            role,
            rollNumber,
            domainOfInterest,
          },
        });
      } else {
        return res.status(400).json({
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
