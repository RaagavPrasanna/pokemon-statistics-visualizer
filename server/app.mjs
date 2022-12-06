/*
    Basic routing for the server
    @author Aidan Catriel
    @date Nov 23, 2022
*/
import express from "express";
import { fetchPokemonList, fetchPokemonDetails } from "./pokemonAPI.mjs";
import {connectDB, populateDB} from "./utils/seed.mjs";
import DB from "./db.mjs";
const port = 5000;
const app = express();
const db = new DB();
let list = await fetchPokemonList()
app.use(express.static('public'));
connectDB("PokeDB", "Collection");

app.get('/pokemonList', async (req, res) => {
    res.json(await db.readAllNames());
})

app.get('/pokemonDetails', async (req, res) => {
    res.json(await db.readAll());
})

app.get('/pokemon/:name', async (req,res) =>{
    let name = req.params.name
    console.log(name)
    res.json(await db.readOneEntry(name));
})
app.get('/populate', async (req,res) =>{
    populateDB()
    res.send("Populating db");
})
app.use(function(req, res){
    res.status(404).send('Not Found')
})

app.listen(port, function(){
    console.log("Server started at http://localhost:"+port);
})