const express = require('express');
const app = express();

app.use(express.json());
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream



let squirrelData = {
    name: "Nutty",
    xp: 0,
};

//root route 
app.get("/", (req, res) => {
  res.send("Welcome to the Virtual Pet API 🐿️");
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
app.post("/", async(req, res) => {
    con.query("UPDATE users SET username= 'ari' WHERE username='Maple'");
    const response = await con.query("SELECT * FROM users");
    console.log(response.rows);
    res.send("hello");
>>>>>>> Stashed changes
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