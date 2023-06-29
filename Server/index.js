console.clear();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const app = express();

mongoose
  .connect("mongodb://localhost/Vidly")
  .then(() => console.log("Connected to database..."))
  .catch((err) => console.log("Not connected with Database...", err.message));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);

app.use(cors());

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
