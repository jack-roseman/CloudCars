require("dotenv").config();
const http = require("http");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const vehicleRoutes = require("./api/routes/vehicles");
const partnerRoutes = require("./api/routes/partners");
const classificationRoutes = require("./api/routes/classifications");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
const {
  addResponder,
  removeResponder,
  getClassificationTasks,
  addClassificationTask,
  removeClassificationTask,
  getConnectionState
} = require("./state");

const Classification = require("./api/models/Classification.js");

const PORT = process.env.PORT || 3000;
const MONGO_URI = `mongodb+srv://jroseman:${process.env.MONGO_PW}@cloudcars-tmsbt.gcp.mongodb.net/CloudCars?retryWrites=true&w=majority`;

mongoose.connect(process.env.MONGOLAB_PINK_URI || MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("connected", function () {
  console.log("Mongoose default connection is open");
});

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log(
      "Mongoose default connection is disconnected due to application termination"
    );
    process.exit(0);
  });
});

app.set("view engine", "ejs");
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

//API ROUTES
app.use("/vehicles", vehicleRoutes);
app.use("/partners", partnerRoutes);
app.use("/classifications", classificationRoutes);

app.post("/classify", (req, res) => {
  addClassificationTask(req.body.imgUrl);
  io.emit("classificationTaskChange", [...getClassificationTasks()]);
  res.json({ response: "processing" }).status(200);
});

//STATIC WEB PAGE ROUTES
app.use("/public", express.static("public"));
app.get("/", (req, res) => res.redirect("/public/respond.html"));
app.get("/db-ops", (req, res) => res.redirect("/public/databaseops.html"));

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

io.on("connection", (socket) => {
  socket.emit("connected"); //ping clients
  socket.on("connected_ack", () => {
    //check if client responds
    console.log(
      `One responder acknowledged connected => ${addResponder()} responders connected`
    );
    io.emit("connectionStateChange", getConnectionState());
    io.emit("classificationTaskChange", [...getClassificationTasks()]);
  });

  socket.on("disconnect", () => {
    console.log(
      `One responder disconnected => ${removeResponder()} responders connected`
    );
    io.emit("connectionStateChange", getConnectionState());
  });

  socket.on("classification_completion", (task) => {
    new Classification({
      _id: new mongoose.Types.ObjectId(),
      url: task.imgUrl,
      label: task.label, //clean or dirty
    }).save();
    removeClassificationTask(task.id);
    io.emit("classificationTaskChange", [...getClassificationTasks()]);
    console.log(task);
  });
});

server.listen(PORT);
