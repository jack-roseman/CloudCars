var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ClassificationSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  path: { type: String, required: true },
  classification: String, //clean or dirty
  date: { type: Date, default: Date.now }, //time this classification occurred
});

module.exports = mongoose.model("Classification", ClassificationSchema);
