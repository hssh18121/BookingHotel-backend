const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  mssv: {
    type: String,
    required: [true, "Please type in your student ID"],
  },
});

const Test = mongoose.model("Test", testSchema);

// const testData1 = new Test({ name: "Nguyen Ha Son ver2", mssv: "20194661" });
// testData1.save();
module.exports = Test;
