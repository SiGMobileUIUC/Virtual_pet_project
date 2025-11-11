const express = require('express');
const app = express();

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

//updates name
app.put("/pet/name", (req, res) => {
    const { name } = req.body;
    squirrelData.name = name;
    res.json({ message: "Pet name updated", squirrel: squirrelData });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});