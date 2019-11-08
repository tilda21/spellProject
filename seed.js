const mongoose = require("mongoose");
const Players = require("./model/Players");
require("dotenv").config(); 
const playersArr = require("./playersArr");

mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true })
  .then(() => console.log("Adding player to DB"))
  .catch(e => console.log(e.message));

Players.collection.drop();

Players.create(playersArr);

const newPlayer = new Players({
  name: "NUNO",
  points: 3100,
  difficulty: 3
}) 

newPlayer.save().then(() => mongoose.connection.close());