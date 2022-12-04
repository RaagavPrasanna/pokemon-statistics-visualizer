/*
    Basic routing for the server
    @author Aidan Catriel
    @date Nov 23, 2022
*/
import express from "express";
import { fetchPokemonList, fetchPokemonDetails } from "./pokemonAPI.mjs";
import db from "./db.js"
const port = 3000;
const app = express();
let list = await fetchPokemonList()
app.use(express.static('public'));

app.get('/pokemonList', (req, res) => {
    let mydb = new db()
    mydb.conn
    res.json(list);
})

app.get('/pokemon', async (req,res) =>{
    let symbol = req.query.name;
    console.log(symbol)
    res.json(await fetchPokemonDetails(symbol));
})
app.use(function(req, res){
    res.status(404).send('Not Found')
})

app.listen(port, function(){
    console.log("Server started at http://localhost:"+port);
})