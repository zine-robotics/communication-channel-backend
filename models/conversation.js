const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema(
  {
    participants: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("conversations", conversationSchema);
