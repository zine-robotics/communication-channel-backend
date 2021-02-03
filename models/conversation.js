const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema(
  {
    conversationName: {
      type: String,
    },
    participants: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        info: {
          id: String,
          name: String
        }
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("conversations", conversationSchema);
