const express = require('express')
const app = express()
const PORT = 3000
const HOST = 'localhost'
var mongoose = require('mongoose');
const Vehicle = require('./api/models/Vehicle.js');

// set up database
const connectionString = "mongodb+srv://jroseman:Poland33@cloudcars-tmsbt.gcp.mongodb.net/CloudCars?retryWrites=true&w=majority";
const connectionOptions = {
	useUnifiedTopology: true,
	useNewUrlParser: true
}

// set up BodyParser
var bodyParser = require('body-parser');
const Partner = require('./api/models/Partner.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up EJS
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/public/databaseops.html');
})

app.post('/vehicles/register', (req, res) => {
    var vehicle = new Vehicle({
		_id: new mongoose.Types.ObjectId(),
		owner: req.body.owner,
        make: req.body.make,
        model: req.body.model,
        year: req.body.year
    })
    vehicle.save().then(result => {
        res.status(201).json({
            message: "POST request to /vehicles/register",
            createdVehicle: vehicle
        });
    }).catch(err => {
        console.log(err)
        res.status(400).json({
            message: "Connection to MongoDB failed"
        })
    });
});

app.get('/vehicles', (req, res) => {
    Vehicle.find().exec().then(vehicles => {
		if (vehicles){
			res.status(200).json({
                message: "GET request to /vehicles",
                vehicles: vehicles
            });
		} else {
			res.status(404).json({
				message: "No vehicles found"
			})
		}
	}).catch(err => {
		res.json({message: "Something Went Wrong"});
		console.log(err);
	})
})

app.post('/partners/register', (req, res) => {
    var partner = new Partner({
		_id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        address : {
            number: req.body.number,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip
        },
        services: req.body.services,
        numberOfEmployees: req.body.numEmployees,
    })
    partner.save().then(result => {
        res.status(201).json({
            message: "POST request to /partners/register",
            createdPartner: partner
        });
    }).catch(err => {
        console.log(err)
        res.status(400).json({
            message: "Connection to MongoDB failed"
        })
    });
});

app.get('/partners', (req, res) => {
    Partner.find().exec().then(partners => {
		if (partners){
			res.status(200).json({
                message: "GET request to /partners",
                partners: partners
            });
		} else {
			res.status(404).json({
				message: "No partners found"
			})
		}
	}).catch(err => {
		res.json({message: "Something Went Wrong"});
		console.log(err);
	})
})

app.listen(PORT, () => {
    mongoose.connect(connectionString, connectionOptions).then(() => {
        console.log("Server connected to MongoDB")
    })
    // mongoose.disconnect()
    console.log(`Example app listening at http://${HOST}:${PORT}`)
})