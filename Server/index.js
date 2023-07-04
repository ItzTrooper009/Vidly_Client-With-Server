console.clear();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const config = require("config");
const app = express();
app.use(cors());

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey not found...");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/Vidly")
  .then(() => console.log("Connected to database..."))
  .catch((err) => console.log("Not connected with Database...", err.message));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
