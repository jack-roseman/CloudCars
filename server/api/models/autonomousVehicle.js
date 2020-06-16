var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AutonomousVehicleSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    provider: {type: String, default: "unknown"},
    make: {type: String, default: "unknown"},
    model: {type: String, default: "unknown"},
    year: {type: String, default: "unknown"},
    sanitaryStatus: {type: String, default: "unknown"},
    lastKnownAddress: {type: String, default: "unknown"},
    lastImageSent: {type: String, default: "unknown"}
});


module.exports = mongoose.model('AutonomousVehicle', AutonomousVehicleSchema);