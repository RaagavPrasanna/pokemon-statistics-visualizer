//const DB = require ("../db.mjs")
import DB from "../db.mjs"
import { fetchPokemonList, fetchPokemonDetails } from "../pokemonAPI.mjs";
const db = new DB();
(async () => {
    try {
      const db = new DB();
      await db.connect("testdb", "pokemon");
      let names = await fetchPokemonList()
      console.log(names)

      for (const id in names) {
        let entry = await fetchPokemonDetails(names[id])
        await db.insertOne(entry)
      }
    } catch (e) {
      console.error("could not connect, " + e);
      process.exit();
    }
  })();