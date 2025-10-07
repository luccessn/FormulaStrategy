require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const TracksModel = require("./Models/tracks");

const app = express();

app.use(cors());
app.use(express.json());

//
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 50000,
  })
  .then(() => {
    console.log("Mongodb სთან კავშირი დამყარებულია");
  })
  .catch((err) => {
    console.error("Mongodb სთან კავშირის ერრორი", err);
  });
//
app.get("/server", (req, res) => {
  res.send("ForMula Strategy Server IS RUNNING ");
});
//Get Tracks
app.get("/server/getTracks", (req, res) => {
  TracksModel.find()
    .then((track) => res.json(track))
    .catch((err) => res.status(500).json({ message: err }));
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is Working on ${PORT} port`);
});
