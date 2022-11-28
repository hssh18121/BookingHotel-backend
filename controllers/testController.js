const { restart } = require("nodemon");
const Test = require("../models/testModel");

exports.getAllTestData = async (req, res, next) => {
  // Execute query
  try {
    const testDatas = await Test.find();

    res.status(200).json({
      data: {
        testDatas: testDatas,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};
