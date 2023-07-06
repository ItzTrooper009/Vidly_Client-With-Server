const express = require("express");
const { Customer } = require("../models/customers");
const { Movie } = require("../models/movies");
const { Rental, validate } = require("../models/rentals");
const auth = require("../middleware/auth");
const asyncMiddleware = require("../middleware/async");

const router = express.Router();

router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const rental = await Rental.find().select(
      "customer.name movie.title dateOut -_id"
    );
    res.send(rental);
  })
);

router.post(
  "/",
  auth,
  asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send("Invalid customer.");

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send("Invalid movie.");

    if (movie.numberInStock === 0)
      return res.status(400).send("Movie not in stock.");

    let rental = new Rental({
      customer: {
        _id: customer.id,
        name: customer.name,
        phone: customer.phone,
      },
      movie: {
        _id: movie.id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
      },
    });

    rental = await rental.save();

    movie.numberInStock--;

    movie.save();

    res.send(rental);
  })
);

router.get(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if (!rental)
      return res
        .status(404)
        .send("The rental with the given ID was not found.");

    res.send(rental);
  })
);

router.delete(
  "/:id",
  auth,
  asyncMiddleware(async (req, res) => {
    const rental = await Rental.findByIdAndDelete(req.params.id);
    //   const rental = await Rental.findById(req.params.id);
    let movie = await Movie.findById(rental.movie._id);

    if (!rental)
      return res
        .status(404)
        .send("The rental with the given ID was not found.");

    movie.numberInStock++;
    movie = await movie.save();

    console.log(movie);
    res.send(rental);
  })
);

module.exports = router;
