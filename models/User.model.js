const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    username: {
      type: String,
      maxLength: 63,
      minLength: 6,
      required: true,
    },
    password: {
      type: String,
      maxLength: 63,
      minLength: 6,
      required: true,
    },
    fullname: {
      type: String,
      maxLength: 255,
      minLength: 6,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      maxLength: 255,
      required: true,
    },
    phone: {
      type: String,
      maxLength: 11,
      minLength: 9,
    },
    avatar: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
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
UserSchema.methods.checkPassword = function (password) {
  return password == this.password;
};
module.exports = mongoose.model("User", UserSchema);
