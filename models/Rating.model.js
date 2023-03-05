const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RatingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hotel: {
      type: Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    star: {
      type: Number,
      max: 10,
      min: 0,
      required: true,
    },
    comment: {
      type: String,
      minlength: 1,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Rating", RatingSchema);
