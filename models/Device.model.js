const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DeviceSchema = new Schema({
  name: { type: String, maxLength: 100, required: true },
  type: { type: String, required: true },
});

module.exports = mongoose.model("Device", DeviceSchema);
