const express = require("express");
const leaderboardRouter = express.Router();
const Players = require("../model/Players");

// get leaderboard
leaderboardRouter.get("/", async (req, res, next) => {
  try {
    const response = await Players.find().sort("-points -difficulty");
    res.status(200).send({ leaderboard: response });
  } catch(e) {
    next(e);
  }
});

leaderboardRouter.get("/:difficulty", async (req, res, next) => {
  try {
    const response = await Players.find({ 
      difficulty: req.params.difficulty.charAt(0).toUpperCase() + req.params.difficulty.substring(1) 
    }).sort("-points");
    res.status(200).send({ leaderboard: response });
  } catch(e) {
    next(e);
  }
})

// update leaderboard 
leaderboardRouter.post("/", async (req, res, next) => {
  const { name, points, difficulty, idToDelete } = req.body;
  // delete player with least points in the given difficulty if the players are 5
  if (idToDelete) {
    try {
      Players.deleteOne({ _id: idToDelete }, (err) => {
        if (err) {
          console.log(err);
        }
      });
    } catch(e) {
      next(e)
    }
  }
  // add new player to the leaderboard
  const newPlayer = new Players({
    name: name,
    points: points,
    difficulty: difficulty
  });
  try {
    const addedPlayer = await newPlayer.save();
    res.status(200).send({ player: addedPlayer });
  } catch(e) {
    next(e);
  }
});

module.exports = leaderboardRouter;

