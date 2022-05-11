const { Schema, model } = require("mongoose");

const trackSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tag: String,
    description: String,
    link: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        description: String,
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Track = model("Track", trackSchema);

module.exports = Track;