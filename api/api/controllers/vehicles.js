const mongoose = require("mongoose");
const Vehicle = require("../models/Vehicle.js");

exports.vehicles_get_all = (req, res) => {
  Vehicle.find()
    .exec()
    .then((vehicles) => {
      if (vehicles) {
        res.status(200).json(vehicles);
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
};

exports.vehicles_get_vehicle = (req, res) => {
  Vehicle.findById(req.params.id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: "No vehicles matching that ID",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.vehicles_add_vehicle = (req, res) => {
  new Vehicle({
    _id: new mongoose.Types.ObjectId(),
    owner: req.body.owner,
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
  })
    .save()
    .then((result) => res.status(201).json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.vehicles_patch_vehicle = (req, res) => {
  const updateOps = {};
  for (var i = 0; i < req.body.length; i++) {
    updateOps[req.body[i].property] = req.body[i].value;
  }
  Vehicle.findByIdAndUpdate(req.params.id, { $set: updateOps }, { new: true })
    .exec()
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.vehicles_delete_vehicle = (req, res) => {
  Vehicle.findByIdAndDelete(req.params.id)
    .exec()
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
