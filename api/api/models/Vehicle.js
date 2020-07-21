var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VehicleSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    owner: {type: String, default: "unknown"},                  //owner of vehicle
    make: {type: String, default: "unknown"},                   //make of car, like Chrysler
    model: {type: String, default: "unknown"},                  //model of car, like Pacifica
    year: {type: String, default: "unknown"},                   //year of car
    sanitaryStatus: {type: String, default: "unknown"},         //sanitary status
    lastKnownAddress: {                                         //last reported address (used to calculate ETA to a partner)
        number: {type: String, default: "unknown"},
        street: {type: String, default: "unknown"},
        city: {type: String, default: "unknown"},
        state: {type: String, default: "unknown"},
        zip: {type: String, default: "unknown"}
    },
    lastImageSent: {type: String, default: "unknown"},          //last image of the interior of the car taken
    dateOfLastCleaning: {type: Date, default: undefined},            //last time car was cleaned
    numTimesServiced : {type: Number, default: 0},              //number of times vehicle has been service
    dateJoined: {type: Date, default: Date.now}                 //date joined cloud cars
}); 

module.exports = mongoose.model('Vehicle', VehicleSchema);