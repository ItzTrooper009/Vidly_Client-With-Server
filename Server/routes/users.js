const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
const { User, validate } = require("../models/users");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already there with given id...");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  user = await user.save();
  res.send(user);
});

module.exports = router;
