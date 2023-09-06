require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");

module.exports = function () {
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.add(
    new winston.transports.Console({ format: winston.format.simple() })
  );

  process.on("uncaughtException", (ex) => {
    winston.error(ex.name, ex);
    setTimeout(() => {
      process.exit(1);
    }, 1000); // Delay of 1 second
  });

  process.on("unhandledRejection", (ex) => {
    winston.error(ex.name, ex);
    setTimeout(() => {
      process.exit(1);
    }, 1000); // Delay of 1 second
  });

  // winston.createLogger({
  //   exceptionHandlers: [
  //     new winston.transports.File({ filename: "uncaughtExceptions.log" }),
  //   ],
  //   rejectionHandlers: [
  //     new winston.transports.File({ filename: "unhandledRejections.log" }),
  //   ],
  // });

  // throw new Error("Uncaught Exception");
  // const p = Promise.reject(new Error("Uncaught Exception Promise"));

  // p.then(() => {
  //   console.log("Success");
  // }).catch(() => {
  //   console.log("Rejected ");
  // });
};
