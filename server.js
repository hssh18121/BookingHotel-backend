require("dotenv").config();
require("./utils/database")();
const express = require("express");
const morgan = require("morgan");
const route = require("./routes");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(morgan("combined"));

app.listen(PORT, () => {
  console.log(`Example app listening on port localhost:${PORT}`);
});
