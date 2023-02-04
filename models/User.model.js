const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
      minLength: 8,
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
      enum: ["user", "admin", "hotel"],
      default: "user",
    },
    isActivated: {
      type: Boolean,
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
  return bcrypt.compareSync(password, this.password);
};
UserSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, process.env.SALT_ROUNDS - 0);
};
UserSchema.methods.saveWithHashPassword = async function () {
  try {
    const salt = await bcrypt.genSalt(process.env.SALT_ROUNDS - 0);
    this.password = await bcrypt.hash(this.password, salt);
    await this.save();
    return this;
  } catch (err) {
    throw err;
  }
};
UserSchema.methods.genToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};
module.exports = mongoose.model("User", UserSchema);
