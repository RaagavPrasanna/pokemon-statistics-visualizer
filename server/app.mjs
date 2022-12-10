/*
    Basic routing for the server
    @author Aidan Catriel
    @date Nov 23, 2022
*/
import express from "express";
import {connectDB, populateDB} from "./utils/seed.mjs";
import DB from "./db.mjs";
import cors from "cors"

const port = process.env.PORT || 5000;
const app = express();
const db = await new DB();


app.use(cors())
app.use(express.static('../app/build'));

// Connect to the db, populate it if empty
await connectDB("Pokedb", "pokemon")
if((await db.readAllNames()).length == 0) {
  console.log("DB empty so populating db")
  await populateDB();
}

// A list of all pokemon names
app.get('/pokemonList', async (req, res) => {
  res.json(await db.readAllNames());
})

// A list of all pokemon details
app.get('/pokemonDetails', async (req, res) => {
  res.json(await db.readAll());
})

// Details for a single pokemon
app.get('/pokemon/:name', async (req, res) =>{
  let name = req.params.name
  console.log(name)
  res.json(await db.readOneEntry(name));
})

// Any other path fails
app.use(function(req, res){
  res.status(404).send('Not Found')
})

app.listen(port, function(){
  console.log("Server started at http://localhost:" + port);
})

export {app, db};