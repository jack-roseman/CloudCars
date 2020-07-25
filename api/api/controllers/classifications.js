const mongoose = require("mongoose");
const Classification = require("../models/Classification.js");

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
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
