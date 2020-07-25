var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PartnerSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true }, //name of partner
  address: { type: String, required: true }, //location of partner
  services: [String], //services offered
  numberOfEmployees: { type: Number, default: 1 }, //number of employees
  numberOfServicings: { type: Number, default: 0 }, //number of cleanings
  dateJoined: { type: Date, default: Date.now }, //date joined CloudCars
});

module.exports = mongoose.model("Partner", PartnerSchema);
