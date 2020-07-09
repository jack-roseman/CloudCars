const express = require('express');
const router = express.Router();
const Partner = require('../models/Partner.js');

router.get('/', (req, res) => {
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

router.post('/register', (req, res) => {
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

module.exports = router;