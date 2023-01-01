require("dotenv").config();
require("./utils/database")();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const route = require("./routes");
// const formidable = require("express-formidable");
const formidable = require("./middlewares/formidable.middleware");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// app.use(express.json());
app.use(formidable);
// app.use(formidable(null, null));
app.use(morgan("combined"));
route(app);
app.listen(PORT, () => {
  console.log(`Example app listening on port localhost:${PORT}`);
});
