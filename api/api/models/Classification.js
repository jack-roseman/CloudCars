var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ClassificationSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  url: { type: String, required: true }, //link to image
  label: { type: String, required: true }, //clean or dirty
  date: { type: Date, default: Date.now }, //time this classification occurred
});

module.exports = mongoose.model("Classification", ClassificationSchema);
