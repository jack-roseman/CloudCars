var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AppointmentSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    partner_id: mongoose.Schema.Types.ObjectId,
    completed: { type: Boolean, default: false },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Appointment", AppointmentSchema);
