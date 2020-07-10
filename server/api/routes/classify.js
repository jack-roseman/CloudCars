const express = require('express');
const router = express.Router();
const ImageClassification = require('../models/ImageClassification.js');

router.post('/', (req, res) => {
    classificationTask = {
        id: ++numClassifications,
        imgUrl: req.body.imgUrl
    }
    classificationTasks.set(classificationTask.id, classificationTask)
    io.emit('classificationTaskChange', [...classificationTasks.values()]);
    res.json({response:"processing"}).status(200);
})

module.exports = router;