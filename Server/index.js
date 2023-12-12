console.clear();
const winston = require("winston");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();

const port = process.env.PORT || 5000;
app.listen(port, () => winston.info(`Server started at PORT ${port}...`));
