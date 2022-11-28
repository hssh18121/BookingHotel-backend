const express = require("express");
const mongoose = require("mongoose");
const testRouter = require("./routes/testRoutes");
const userRouter = require("./routes/userRoutes");
const hotelRouter = require("./routes/hotelRoutes");
const app = express();

const uri =
  "mongodb+srv://hason:hs123478@cluster0.orlh8eg.mongodb.net/test?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.error(error);
  }
}

connect();

app.use(testRouter);
app.use(userRouter);
app.use(hotelRouter);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
