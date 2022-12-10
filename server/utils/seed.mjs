import { Int32 } from "mongodb";
import DB from "../db.mjs"
import { fetchPokemonList, fetchPokemonDetails } from "../pokemonAPI.mjs";
const db = new DB();

// Connect to the db
export async function connectDB(dbName, collName) {
  try {
    const db = new DB();
    await db.connect(dbName, collName)
  } catch (e) {
    console.error("could not connect, " + e);
    process.exit();
  }
}

// Populate the db with pokemon details
export async function populateDB() {
  try {
    let names = await fetchPokemonList()

    for (const id in names) {
      let entry = await fetchPokemonDetails(names[id])
      entry["_id"] = Number(id)
      console.log(entry)
      await db.insertOne(entry)
    }

  } catch (e) {
    console.error("could not populate, " + e);
    process.exit();
  }
};