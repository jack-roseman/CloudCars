const mongoose = require("mongoose");
const fs = require("fs");
const Appointment = require("../models/Appointment.js");

exports.appointments_get_all = (req, res) => {
  Appointment.find()
    .exec()
    .then((appointments) => {
      if (appointments) {
        res.status(200).json(appointments);
      } else {
        res.status(404).json({
          message: "No appointments found",
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

exports.appointments_get_appointment = (req, res) => {
  Appointment.findById(req.params.id)
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: "No appointments matching that ID",
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
