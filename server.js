const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const errorHandler = require("errorhandler");
const mongoose = require("mongoose");
require("dotenv").config();
// to deploy
const path = require("path");

const leaderboardRouter = require("./routers/leaderboardRouter");

mongoose.connect(process.env.MONGODB_URI || process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to DB"))
  .catch(e => console.log(e.message));


const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(errorHandler());

// to deploy
app.use(express.static(path.join(__dirname, "client", "build")))

app.use("/leaderboard", leaderboardRouter);

app.use(errorHandler);

// to deploy
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
