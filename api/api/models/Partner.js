var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PartnerSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, default: "unknown"},               //name of partner
    address: {                                              //location of partner
        number: {type: String, default: "unknown"},
        street: {type: String, default: "unknown"},
        city: {type: String, default: "unknown"},
        state: {type: String, default: "unknown"},
        zip: {type: String, default: "unknown"}
    },
    services: [String],                                     //services offered
    numberOfEmployees: {type: Number, default: 1},          //number of employees
    numberOfServicings: {type: Number, default: 0},          //number of cleanings
    dateJoined: { type: Date, default: Date.now },          //data joined CloudCars
});


module.exports = mongoose.model('Partner', PartnerSchema);