const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Partner = require("../models/Partner.js");

router.get("/", (req, res) => {
  Partner.find()
    .exec()
    .then((partners) => {
      if (partners) {
        res.status(200).json({
          partners: partners,
        });
      } else {
        res.status(404).json({
          message: "No partners found",
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
  new Partner({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    address: {
      number: req.body.number,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
    },
    services: req.body.services,
    numberOfEmployees: req.body.numEmployees,
  })
    .save()
    .then((result) => {
      res.status(201).json({
        createdPartner: result,
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
