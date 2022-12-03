const mongoose = require("mongoose");
function connect() {
  mongoose
    .connect(process.env.MONGO_URI, {
      // useCreateIndex: true,
    })
    .then((connection) => {
      console.log(`MongooseDB connect: ${connection.connection.host}`);
    })
    .catch((error) => {
      console.log(`MongoDB connection error: ${error}`);
    });
}
module.exports = connect;
