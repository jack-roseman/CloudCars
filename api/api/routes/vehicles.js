const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Vehicle = require("../models/Vehicle.js");

router.get("/", (req, res) => {
  Vehicle.find()
    .exec()
    .then((vehicles) => {
      if (vehicles) {
        res.status(200).json({
          message: "GET request to /vehicles",
          vehicles: vehicles,
        });
      } else {
        res.status(404).json({
          message: "No vehicles found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/register", (req, res) => {
  new Vehicle({
    _id: new mongoose.Types.ObjectId(),
    owner: req.body.owner,
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
  })
    .save()
    .then((result) => {
      res.status(201).json({
        createdVehicle: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
