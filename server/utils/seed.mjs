//const DB = require ("../db.mjs")
import { Int32 } from "mongodb";
import DB from "../db.mjs"
import { fetchPokemonList, fetchPokemonDetails } from "../pokemonAPI.mjs";
const db = new DB();
(async () => {
    try {
      const db = new DB();
      await db.connect("testdb", "pokemon");
      let names = await fetchPokemonList()

      for (const id in names) {
        let entry = await fetchPokemonDetails(names[id])
        entry["_id"] = Number(id)
        console.log(entry)
        await db.insertOne(entry)
      }

    } catch (e) {
      console.error("could not connect, " + e);
      process.exit();
    }
  })();