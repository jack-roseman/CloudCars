var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AppointmentSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    partner_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    vehicle_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    classification: { type: String, required: true },
    status: {
      type: String,
      enum: ["pre_arrival", "in_progress", "complete"],
      default: "pre_arrival",
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Appointment", AppointmentSchema);
