const express = require('express');
const cors = require('cors')
const app = express();

const {Client} = require('pg');
require('dotenv').config();

const con = new Client(process.env.DATABASE_URL);

con.connect().then(() => console.log("Connected"));

app.use(express.json());
app.use(cors());

<<<<<<< HEAD
//create a new pet in the pets table
app.post("/new-pet", async(req, res) => {
     try {
        let data = req.body;
        await con.query("INSERT INTO pets (pet_name, xp, user_id) VALUES ($1, $2, $3)", [req.pet_name, 0, req.user_id]);
=======
//frontend sends request to xp
app.post("/add-xp", async(req, res) => {
     try {
        let data = req.body;
        await con.query("UPDATE pets SET xp=xp+$1 WHERE pet_id = $2", [data.xp, data.pet_id]);
        console.log(`200 OK: ${data.xp} X added to pet with ID ${data.pet_id}`);
>>>>>>> 2018d7f (frontend xp implementation)
        res.status(200).send("works");
    } catch (e) {
        console.log(e);
        res.status(500).send("internal server error");
    }
})

<<<<<<< HEAD

//frontend sends request to xp
app.post("/add-xp", async(req, res) => {
     try {
        let data = req.body;
        await con.query("UPDATE pets SET xp=xp+$1 WHERE pet_id = $2", [data.xp, data.pet_id]);
        console.log(`200 OK: ${data.xp} X added to pet with ID ${data.pet_id}`);
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
=======
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


>>>>>>> 2018d7f (frontend xp implementation)







<<<<<<< HEAD


=======
>>>>>>> 2018d7f (frontend xp implementation)
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