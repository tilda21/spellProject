const mongoose = require("mongoose");

const playersSchema = mongoose.Schema({
  name: { type: String, required: true},
  points: { type: Number, required: true},
  difficulty: { type: Number, required: true}
});

module.exports = mongoose.model("Players", playersSchema)