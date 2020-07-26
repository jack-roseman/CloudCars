var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var VehicleSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    owner: { type: String, required: true }, //owner of vehicle
    make: { type: String, required: true }, //make of car, like Chrysler
    model: { type: String, required: true }, //model of car, like Pacifica
    year: { type: String, required: true }, //year of car
    sanitaryStatus: String, //sanitary status
    lastKnownAddress: String, //last reported address (used to calculate ETA to a partner)
    lastImageSent: String, //last image of the interior of the car taken
    dateOfLastCleaning: Date, //last time car was cleaned
    numTimesServiced: { type: Number, default: 0 }, //number of times vehicle has been service
    dateJoined: { type: Date, default: Date.now }, //date joined cloud cars
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Vehicle", VehicleSchema);
