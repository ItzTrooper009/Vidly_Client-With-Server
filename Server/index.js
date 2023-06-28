console.clear();
const express = require("express");
const cors = require("cors");
const genres = require("./routes/genres");

const app = express();

app.use("/api/genres", genres);

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
