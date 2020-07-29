var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ClassificationSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    vehicle_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    path: { type: String, required: true },
    classification: String, //clean or dirty
    date: { type: Date, default: Date.now }, //time this classification occurred
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Classification", ClassificationSchema);
