var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PartnerSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true }, //name of partner
  address: {
    //location of partner
    number: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },
  services: [String], //services offered
  numberOfEmployees: { type: Number, default: 1 }, //number of employees
  numberOfServicings: { type: Number, default: 0 }, //number of cleanings
  dateJoined: { type: Date, default: Date.now }, //date joined CloudCars
});

module.exports = mongoose.model("Partner", PartnerSchema);
