/*
    Basic routing for the server
    @author Aidan Catriel
    @date Nov 23, 2022
*/
import express from "express";
import { fetchPokemonList, fetchPokemonDetails } from "./pokemonAPI.mjs";
import cors from "cors"

const port = 5000;
const app = express();
let list = await fetchPokemonList()

let statsList = await (async () => {
  let tempList = []
  for(const key in list) {
    let temp = await fetchPokemonDetails(list[key])
    tempList.push(temp)
  }
  return [...tempList]
})();

console.log(statsList.length)

console.log(list)

app.use(express.static('public'));
app.use(cors())

app.get('/pokemonList', (req, res) => {
  res.json(list);
})

app.get('/allPokemonStats', (req, res) => {
  res.json(statsList)
})

app.get('/pokemon', async (req, res) =>{
  let symbol = req.query.name;
  console.log(symbol)
  res.json(await fetchPokemonDetails(symbol));
})
app.use(function(req, res){
  res.status(404).send('Not Found')
})

app.listen(port, function(){
  console.log("Server started at http://localhost:" + port);
})