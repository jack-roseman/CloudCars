require("dotenv").config();
const http = require("http");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fs = require("fs");
var os = require("os");
const multer = require("multer");
const vehicleRoutes = require("./api/routes/vehicles");
const partnerRoutes = require("./api/routes/partners");
const classificationRoutes = require("./api/routes/classifications");
const appointmentRoutes = require("./api/routes/appointments");

const Classification = require("./api/models/Classification.js");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
var socket;
const {
  getNumResponders,
  addResponder,
  removeResponder,
  getClassificationTasks,
  addClassificationTask,
  removeClassificationTask,
  getConnectionState,
} = require("./state");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new mongoose.Types.ObjectId().toString() +
        (file.mimetype === "image/jpeg" ? ".jpg" : ".png")
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Image must have mimetype of image/jpeg or image/png"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, //5 megabytes,
  },
  fileFilter: fileFilter,
});

const PORT = process.env.PORT || 3000;
const MONGO_URI = mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.MONGOLAB_PINK_URI, {
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
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/classifications", classificationRoutes);
app.use("/api/appointments", appointmentRoutes);
app.post("/api/classify", upload.single("data"), (req, res) => {
  if (getNumResponders() > 0 && socket) {
    addClassificationTask(req.file.path);
    io.emit("classificationTaskChange", [...getClassificationTasks()]);
    socket.on("classification_completion", (task) => {
      new Classification({
        _id: req.file.filename.split(".")[0],
        vehicle_id: req.body.vehicle_id,
        path: req.file.path,
        classification: task.label, //clean or dirty
      }).save();
      removeClassificationTask(task.id);
      io.emit("classificationTaskChange", [...getClassificationTasks()]);

      res.status(200).json({
        classification: task.label,
        request: {
          type: "POST",
          url: `http://${req.hostname}/api/partners/closest`,
          body: {
            service_type: "interior cleaning",
            vehicle_id: req.body.vehicle_id,
            classification: task.label,
            vehicle_lat_long: {
              lat: req.body.lat,
              lng: req.body.long,
            },
          },
        },
      });
    });
  } else {
    console.log("Missed a classification request!");
    fs.unlink(req.file.path, (error) => (error ? console.log(error) : null));
    res.status(500).json({ error: "Unable to respond" });
  }
});

//STATIC WEB PAGE ROUTES
app.use("/public", express.static("public"));
app.use("/uploads", express.static("uploads"));
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

io.on("connection", (s) => {
  socket = s;
  s.emit("connected"); //ping clients
  s.on("connected_ack", () => {
    //check if client responds
    console.log(
      `One responder acknowledged connected => ${addResponder()} responders connected`
    );
    io.emit("connectionStateChange", getConnectionState());
    io.emit("classificationTaskChange", [...getClassificationTasks()]);
  });

  s.on("disconnect", () => {
    console.log(
      `One responder disconnected => ${removeResponder()} responders connected`
    );
    io.emit("connectionStateChange", getConnectionState());
  });
});

server.listen(PORT);
