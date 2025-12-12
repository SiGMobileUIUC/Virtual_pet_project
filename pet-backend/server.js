const cors = require("cors");
const express = require('express');
const app = express();

app.use(cors({
  origin: "http://localhost:8081",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.use(express.json());

let squirrelData = {
    name: "Nutty",
    xp: 0,
};

//root route 
app.get("/", (req, res) => {
  res.send("Welcome to the Virtual Pet API 🐿️");
});

//gets data 
app.get("/pet", (req, res) => {
    res.json(squirrelData);
});

//creates new pet
app.post("/pet", (req, res) => {
    const { name, xp } = req.body;
    squirrelData.name = name;
    squirrelData.xp = xp;
    res.json({ message: "Pet created", squirrel: squirrelData });
});

//updates xp 
app.put("/pet/xp", (req, res) => {
    const { xp } = req.body;
    squirrelData.xp += xp;
    res.json({ message: "Pet XP updated", squirrel: squirrelData });
});

app.post("/feed", (req, res) => {
  const FEED_XP = 10;
  squirrelData.xp = Number(squirrelData.xp) || 0;
  squirrelData.xp += FEED_XP;
  res.json({ message: "Pet fed", squirrel: squirrelData });
});

app.post("/play", (req, res) => {
  const PLAY_XP = 15;
  squirrelData.xp = Number(squirrelData.xp) || 0;
  squirrelData.xp += PLAY_XP;
  res.json({ message: "Played with pet", squirrel: squirrelData });
});



//updates name
app.put("/pet/name", (req, res) => {
    const { name } = req.body;
    squirrelData.name = name;
    res.json({ message: "Pet name updated", squirrel: squirrelData });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});