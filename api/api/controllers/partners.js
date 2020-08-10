const mongoose = require("mongoose");
const Partner = require("../models/Partner.js");
const { Client, Status } = require("@googlemaps/google-maps-services-js");
const client = new Client({});
let nodeGeocoder = require("node-geocoder");

let geoCoder = nodeGeocoder({
  provider: "openstreetmap",
});

exports.partners_get_all = (req, res) => {
  Partner.find()
    .select("name address.formattedAddress serviceTypes ")
    .exec()
    .then((docs) => {
      if (docs) {
        res.status(200).json(docs);
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

exports.partners_get_partner = (req, res) => {
  Partner.findById(req.params.id)
    .select("name address.formattedAddress serviceTypes ")
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: "No partners matching that ID",
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

exports.partners_get_closest = async (req, res, next) => {
  let serviceType = req.body.service_type;
  let vehicle_id = req.body.vehicle_id;
  let vehicle_loc = req.body.vehicle_lat_lng;
  let destinations = await Partner.find()
    .select("address.latitude address.longitude address.formattedAddress")
    .exec();
  if (!destinations.length) {
    res.send([]);
  } else {
    let distanceMatrixResponse = await client.distancematrix({
      params: {
        origins: [vehicle_loc],
        destinations: destinations.map((partner) => {
          return {
            lat: partner.address.latitude,
            lng: partner.address.longitude,
          };
        }),
        key: process.env.GOOGLE_API_KEY,
      },
      timeout: 1000,
    });

    let closest = distanceMatrixResponse.data.rows[0].elements
      .map((matrixElement, i) => {
        return {
          partner_id: destinations[i]._id,
          partner_address: destinations[i].address,
          travel_info: {
            drive_time_seconds: matrixElement.duration.value,
            drive_distance_meters: matrixElement.distance.value,
          },
          options: {
            book: {
              type: "POST",
              url: `http://${req.hostname}/api/appointments/book`,
              body: {
                partner_id: destinations[i]._id,
                vehicle_id: vehicle_id,
                classification: req.body.classification,
              },
            },
          },
        };
      })
      .sort(
        (a, b) =>
          a.travel_info.drive_time_seconds - b.travel_info.drive_time_seconds
      );
    res.status(200).json(closest);
  }
};

exports.partners_add_partner = async (req, res) => {
  let addresses = await geoCoder.geocode(req.body.address);
  new Partner({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    address: {
      ...addresses[0],
    },
    serviceTypes: req.body.serviceTypes,
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
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: "No partners matching that ID",
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
