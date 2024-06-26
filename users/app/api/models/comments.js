const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    comment: {
      type: String,
      trim: true,
      required: true
    },
    posted_by: {
      type: String,
      trim: true,
      required: true
    },
    newsId: {
      type: String,
      trim: true,
      required: true
    },
    userId: {
      type: String,
      trim: true,
      required: true
    },
    replied_comment: {
      type: Array
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comments", CommentSchema);
