var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PartnerSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true }, //name of partner
    address: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      formattedAddress: { type: String, required: true },
      country: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipcode: { type: String, required: true },
      streetName: { type: String, required: true },
      countryCode: { type: String, required: true },
      streetNumber: { type: String, required: false },
      neighbourhood: { type: String, required: false },
    }, //location of partner
    services: [String], //services offered
    numberOfEmployees: { type: Number, default: 1 }, //number of employees
    numberOfServicings: { type: Number, default: 0 }, //number of cleanings
    dateJoined: { type: Date, default: Date.now }, //date joined CloudCars
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Partner", PartnerSchema);
