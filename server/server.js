const os = require("os");
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const vehicleRoutes = require("./api/routes/vehicles");
const partnerRoutes = require("./api/routes/partners");
const classifyRoutes = require("./api/routes/classify");
const { reset } = require("nodemon");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
//TODO - make this information more private
const MONGO_URI =
  "mongodb+srv://jroseman:Poland33@cloudcars-tmsbt.gcp.mongodb.net/CloudCars?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3000;

//maintain the state of the what the responders are doing
connectionState = {
  numResponders: 0,
};
classificationTasks = new Map();
numClassifications = 0;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.set("view engine", "ejs");

//ROUTES
app.use("/vehicles", vehicleRoutes);
app.use("/partners", partnerRoutes);
app.use("/classify", classifyRoutes);
app.use("/public", express.static("public"));
app.get("/", (req, res) => {
  res.redirect("/public/respond.html");
});

app.get("/db-ops", (req, res) => {
  res.redirect("/public/databaseops.html");
});
app.get("/classification-ops", (req, res) => {
  res.redirect("/public/respond.html");
});
app.get("/server-info", (req, res) => {
  res
    .json({
      hostname: os.hostname(),
      homedir: os.homedir(),
      platform: os.platform(),
      architecture: os.arch(),
      type: os.type(),
      totalmem: os.totalmem(),
      release: os.release(),
      EOLmarker: os.EOL,
    })
    .status(200);
});
app.use((req, res, next) => {
  const error = new Error("404");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

mongoose.connect(process.env.MONGOLAB_PINK_URI || MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("connected", function () {
  console.log("Mongoose default connection is open");
});

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose default connection is disconnected due to application termination");
    process.exit(0);
  });
});

io.on("connection", (socket) => {
  socket.emit("connected"); //ping clients
  socket.on("connected_ack", () => {
    //check if client responds
    connectionState.numResponders += 1;
    console.log(
      `One responder acknowledged connected => ${connectionState.numResponders} responders connected`
    );
    io.emit("connectionStateChange", connectionState);
    io.emit("classificationTaskChange", [...classificationTasks.values()]);
  });

  socket.on("disconnect", () => {
    connectionState.numResponders -= 1;
    console.log(
      `One responder disconnected => ${connectionState.numResponders} responders connected`
    );
    io.emit("connectionStateChange", connectionState);
  });

  socket.on("classification_completion", (task) => {
    new ImageClassification({
      _id: new mongoose.Types.ObjectId(),
      url: task.imgUrl,
      label: task.label, //clean or dirty
    }).save();

    classificationTasks.delete(task.id); //remove task from queue since someone responded to it
    io.emit("classificationTaskChange", [...classificationTasks.values()]);
    console.log(task);
  });
});

server.listen(PORT);
