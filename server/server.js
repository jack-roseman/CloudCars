const os = require('os');
const express = require('express')
const app = express()
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
require('dotenv').config()

const ImageClassification = require('./api/models/ImageClassification.js');

const vehicleRoutes = require('./api/routes/vehicles');
const partnerRoutes = require('./api/routes/partners');

//TODO - make this information more private
const MONGO_URI = "mongodb+srv://jroseman:Poland33@cloudcars-tmsbt.gcp.mongodb.net/CloudCars?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3000;

//maintain the state of the what the responders are doing
connectionState = {
    numResponders: 0
}

classificationTasks = new Map();
numClassifications = 0

// set up BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up EJS
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use('/vehicles', vehicleRoutes);
app.use('/partners', partnerRoutes);

app.get('/', (req, res) => {
    res.redirect('/public/respond.html');
});

app.get('/db-ops', (req, res) => {
    res.redirect('/public/databaseops.html');
});

app.get('/classification-ops', (req, res) => {
    res.redirect('/public/respond.html');
})

app.post('/classify', (req, res) => {
    classificationTask = {
        id: ++numClassifications,
        imgUrl: req.body.imgUrl
    }
    classificationTasks.set(classificationTask.id, classificationTask)
    io.emit('classificationTaskChange', [...classificationTasks.values()]);
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

mongoose.connect(process.env.MONGOLAB_PINK_URI || MONGO_URI, {
	useUnifiedTopology: true,
	useNewUrlParser: true
});

mongoose.connection.on('connected', function(){  
    console.log("Mongoose default connection is open");
 });

process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log(termination("Mongoose default connection is disconnected due to application termination"));
        process.exit(0)
    });
});

io.on('connection', (socket) => {
    socket.emit('connected');                   //ping clients
    socket.on('connected_ack', () => {         //check if client responds
        connectionState.numResponders += 1;
        console.log(`One responder acknowledged connected => ${connectionState.numResponders} responders connected`);
        io.emit('connectionStateChange', connectionState);
        io.emit('classificationTaskChange', [...classificationTasks.values()])
    });

    socket.on('disconnect', () => {
        connectionState.numResponders -= 1;
        console.log(`One responder disconnected => ${connectionState.numResponders} responders connected`);
        io.emit('connectionStateChange', connectionState); 
    });

    socket.on('classification_completion', (task) => {
        new ImageClassification({
            _id: new mongoose.Types.ObjectId(),
            url: task.imgUrl,
            label: task.label,   //clean or dirty
        }).save();

        classificationTasks.delete(task.id); //remove task from queue since someone responded to it
        io.emit('classificationTaskChange', [...classificationTasks.values()]);
        console.log(task);
    });
});

server.listen(PORT);