const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle.js');

router.get('/', (req, res) => {
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

router.post('/register', (req, res) => {
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

module.exports = router;