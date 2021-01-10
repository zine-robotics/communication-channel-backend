const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["fresher", "admin"],
      default: "fresher",
    },
    rollNumber: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    college: {
      type: String,
      enum: ["IIIT", "MNIT"],
      default: "MNIT"
    },
    domainOfInterest: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

userSchema.virtual("password").set(function (password) {
  this.hash_password = bcrypt.hashSync(password, 10);
});

userSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hash_password);
  },
};

module.exports = mongoose.model("user", userSchema);
