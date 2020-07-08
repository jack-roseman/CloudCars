const os = require('os');
const express = require('express')
const app = express()
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
require('dotenv').config()

const Vehicle = require('./api/models/Vehicle.js');
const Partner = require('./api/models/Partner.js');
const ImageClassification = require('./api/models/ImageClassification.js');

// set up database
const connectionString = "mongodb+srv://jroseman:Poland33@cloudcars-tmsbt.gcp.mongodb.net/CloudCars?retryWrites=true&w=majority";
const connectionOptions = {
	useUnifiedTopology: true,
	useNewUrlParser: true
}

// set up BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up EJS
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/public/databaseops.html');
});

app.get('/db-ops', (req, res) => {
    res.redirect('/public/databaseops.html');
});

app.get('/classification-ops', (req, res) => {
    res.redirect('/public/respond.html');
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

app.post('/classify', (req, res) => {
    io.emit('classify', req.body);
    res.json({response:"processing"}).status(200);
})

app.get('/server-info', (req, res) => {
    res.json({
        hostname: os.hostname(),
        homedir: os.homedir(),
        platform: os.platform(),
        architecture: os.arch(),
        type: os.type(),
        totalmem: os.totalmem(),
        release: os.release(),
        EOLmarker: os.EOL,

    }).status(200);
});

const port = process.env.PORT || 3000;
server.listen(port);

mongoose.connect(process.env.MONGODB_URI || connectionString, connectionOptions);

mongoose.connection.on('connected', function(){  
    console.log("Mongoose default connection is open to ", connectionString);
 });

process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log(termination("Mongoose default connection is disconnected due to application termination"));
        process.exit(0)
    });
});

io.on('connection', (socket) => {
    socket.emit('connected', true);
    socket.on('ack', (res) => {
        new ImageClassification({
            _id: new mongoose.Types.ObjectId(),
            url: res.imgUrl,
            label: res.label,   //clean or dirty
        }).save().then((classification) => {
            console.log(classification);
        });
    });
});


