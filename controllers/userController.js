const { restart } = require("nodemon");
const User = require("../models/userModel");

exports.getAllUsers = async (req, res, next) => {
  // Execute query
  try {
    const users = await User.find();

    res.status(200).json({
      data: {
        users: users,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({
        message: "Can not find a user with that ID",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};
