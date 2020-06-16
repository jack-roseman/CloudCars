const express = require('express')
const app = express()
const PORT = 3000
const HOST = 'localhost'
var mongoose = require('mongoose');
const AutonomousVehicle = require('./api/models/autonomousVehicle.js');

// set up database
const MongoClient = require('mongodb').MongoClient;
const connectionString = "mongodb+srv://jroseman:Poland33@cloudcars-tmsbt.gcp.mongodb.net/CloudCars?retryWrites=true&w=majority";
const connectionOptions = {
	useUnifiedTopology: true,
	useNewUrlParser: true
}

// set up BodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up EJS
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/public/databaseops.html');
})

app.post('/vehicles/register/:provider/:make/:model/:year', (req, res) => {
    var vehicle = new AutonomousVehicle({
		_id: new mongoose.Types.ObjectId(),
		provider: req.params.provider,
        make: req.params.make,
        model: req.params.model,
        year: req.params.year
    })
    vehicle.save().then(result => {
        res.status(201).json({
            message: "POST request to /registerVehicle",
            createdVehicle: vehicle
        });
    }).catch(err => {
        console.log(err)
        res.status(400).json({
            message: "Connection to MongoDB failed"
        })
    });
});

app.listen(PORT, () => {
    mongoose.connect(connectionString, connectionOptions).then(() => {
        console.log("Server connected to MongoDB")
    })
    // mongoose.disconnect()
    console.log(`Example app listening at http://${HOST}:${PORT}`)
})