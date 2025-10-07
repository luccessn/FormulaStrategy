const mongoose = require("mongoose");

const TracksSchema = new mongoose.Schema({
  name: String,
  lenght: String,
  firstGP: String,
  fastestlap: String,
  fastestmn: String,
  descr: String,
  type: String,
  country: String,
  src: String,
});

const TracksModel = mongoose.model("tracks", TracksSchema);
module.exports = TracksModel;
