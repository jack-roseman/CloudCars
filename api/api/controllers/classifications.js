const mongoose = require("mongoose");
const fs = require("fs");
const Classification = require("../models/Classification.js");
var root = require("../../root");

exports.classifications_get_all = (req, res) => {
  Classification.find()
    .exec()
    .then((classifications) => {
      if (classifications) {
        res.status(200).json(classifications);
      } else {
        res.status(404).json({
          message: "No classifications found",
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

exports.classifications_add_classification = (req, res) => {
  new Classification({
    _id: new mongoose.Types.ObjectId(),
    url: req.body.url,
    classification: req.body.classification,
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

exports.classifications_delete_classification = (req, res) => {
  Classification.findByIdAndDelete(req.params.id)
    .then((result) => {
      fs.unlink(`${root}/${result.path}`, (error) =>
        error ? console.log(error) : null
      );
      res.status(200).json({ message: "ok" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
