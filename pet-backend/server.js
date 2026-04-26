const express = require('express');
const app = express();
const {Client} = require('pg');
require('dotenv').config();

const con = new Client(process.env.DATABASE_URL);

con.connect().then(() => console.log("Connected"));

app.use(express.json());


//frontend sends request to xp
app.post("/add-xp", async(req, res) => {
     try {
        let data = req.body;
        let feed = data.feed ? 5 : 10
        await con.query("UPDATE pets SET xp=xp+$1 WHERE pet_id = $2", [feed, data.pet_id]);
        res.status(200).send("works");
    } catch (e) {
        console.log(e);
        res.status(500).send("internal server error");
    }
})

//give frontend access to pet info
app.get("/pet-info", async(req, res) =>{
    try {
        let data = req.body;
        let result = await con.query("SELECT * FROM pets WHERE user_id = $1", [data.user_id]);
        res.status(200).send(result.rows);
    } catch (e) {
        console.log(e);
        res.status(500).send("internal server error");
    }
})









// app.get("/", async(req, res) => {
//     // con.query("UPDATE pet SET pet_name= 'squirrel' WHERE username='maple'");
//     const response = await con.query("SELECT * FROM users");
//     console.log(response.rows);
//     res.send("hello");
// });

// app.use(express.json());

// let squirrelData = {
//     name: "Nutty",
//     xp: 0,
// };


// //root route 
// app.get("/", (req, res) => {
//   res.send("Welcome to the Virtual Pet API 🐿️");
// });

// //gets data 
// app.get("/pet", (req, res) => {
//     res.json(squirrelData);
// });

// //creates new pet
// app.post("/pet", (req, res) => {
//     const { name, xp } = req.body;
//     squirrelData.name = name;
//     squirrelData.xp = xp;
//     res.json({ message: "Pet created", squirrel: squirrelData });
// });

// //updates xp 
// app.put("/pet/xp", (req, res) => {
//     const { xp } = req.body;
//     squirrelData.xp += xp;
//     res.json({ message: "Pet XP updated", squirrel: squirrelData });
// });

// //updates name
// app.put("/pet/name", (req, res) => {
//     const { name } = req.body;
//     squirrelData.name = name;
//     res.json({ message: "Pet name updated", squirrel: squirrelData });
// });

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});