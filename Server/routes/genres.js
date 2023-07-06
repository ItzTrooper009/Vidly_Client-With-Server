const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Genre, validate } = require("../models/genres");
const asyncMiddleware = require("../middleware/async");

const router = express.Router();

// router.get("/", async (req, res, next) => {
//   try {
//     const genres = await Genre.find().sort({ name: 1 });
//     res.send(genres);
//   } catch (error) {
//     next(error);
//   }
// });

router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const genres = await Genre.find().sort({ name: 1 });
    res.send(genres);
  })
);

router.post(
  "/",
  auth,
  asyncMiddleware(async (req, res) => {
    const nameAlreadyPresent = await Genre.find({
      name: req.body.name,
    }).select({
      name: 1,
    });
    if (nameAlreadyPresent.length !== 0) {
      return res.send(`Genre Already Present With name: ${req.body.name}`);
    }
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.send(genre);
  })
);

router.put(
  "/:id",
  auth,
  asyncMiddleware(async (req, res) => {
    const nameAlreadyPresent = await Genre.find({
      name: req.body.name,
    }).select({
      name: 1,
    });
    if (nameAlreadyPresent.length !== 0) {
      return res.send(`Genre Already Present With name: ${req.body.name}`);
    }
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!genre)
      return res.status(404).send("The genre with the given ID was not found.");

    res.send(genre);
  })
);

router.delete(
  "/:id",
  auth,
  asyncMiddleware(async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    // const genre = genres.find((c) => c.id === parseInt(req.params.id));
    if (!genre)
      return res.status(404).send("The genre with the given ID was not found.");

    // const index = genres.indexOf(genre);
    // genres.splice(index, 1);

    res.send(genre);
  })
);

router.get(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    // const genre = genres.find((c) => c.id === parseInt(req.params.id));
    if (!genre)
      return res.status(404).send("The genre with the given ID was not found.");
    res.send(genre);
  })
);

module.exports = router;
