const { check, validationResult } = require("express-validator");

exports.validateSignupRequest = [
  check("fullName").notEmpty().withMessage("Full Name is required"),
  check("email").isEmail().withMessage("Valid email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters long"),
  check("rollNumber").notEmpty().withMessage("Roll number id required"),
  check("domainOfInterest")
    .notEmpty()
    .withMessage("Domain of interest is required"),
];

exports.validateSigninRequest = [
  check("email").isEmail().withMessage("Enter email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 character long"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
