var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageClassificationSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    url: String,     //link to image
    label: String,   //clean or dirty
    date: {type: Date, default: Date.now} //time this classification occurred           

    //future attributes
    // - who
}); 

module.exports = mongoose.model('ImageClassification', ImageClassificationSchema);