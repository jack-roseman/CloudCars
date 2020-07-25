const mongoose = require("mongoose");
const Partner = require("../models/Partner.js");

exports.partners_get_all = (req, res) => {
  Partner.find()
    .exec()
    .then((partners) => {
      if (partners) {
        res.status(200).json(partners);
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
};

exports.partners_add_partner = (req, res) => {
  new Partner({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    address: req.body.address,
    services: req.body.services,
    numberOfEmployees: req.body.numberOfEmployees,
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

exports.partners_patch_partner = (req, res) => {
  const updateOps = {};
  for (var i = 0; i < req.body.length; i++) {
    updateOps[req.body[i].property] = req.body[i].value;
  }
  Partner.findByIdAndUpdate(req.params.id, { $set: updateOps }, { new: true })
    .exec()
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.partners_delete_partner = (req, res) => {
  Partner.findByIdAndDelete(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
