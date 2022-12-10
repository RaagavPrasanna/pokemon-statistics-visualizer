import * as dotenv from "dotenv";
dotenv.config();
const dbUrl = process.env.ATLAS_URI;
import MongoClient from "mongodb";

let instance = null;

// Connects to the Mongo db
class DB {
  constructor(){
    // Instance is the singleton, defined in outer scope
    if (!instance){
      instance = this;
      this.client = new MongoClient.MongoClient(dbUrl);
      this.db = null;
      this.collection = null;
    }
    return instance;
  }

  // Connect to db collection
  async connect(dbname, collName) {
    if (instance.db){
      return;
    }
    await instance.client.connect();
    instance.db = await instance.client.db(dbname);
    console.log("Successfully connected to MongoDB database " + dbname);
    instance.collection = await instance.db.collection(collName)
  }

  // Close connection
  async close() {
    await instance.client.close();
    instance = null;
  }

  // Return all information
  async readAll() {
    return await instance.collection.find().toArray();
  }

  // Return all names
  async readAllNames() {
    const projection = {name: 1}
    const cursor = instance.collection.find().project(projection)
    return await cursor.toArray();
  }

  // Return one entry
  async readOneEntry(name) {
    const cursor = instance.collection.find({name: {$eq: name}})
    return await cursor.toArray();
  }

  // Insert one entry
  async insertOne(entry) {
    try {
      return await instance.collection.insertOne(entry);
    } catch (error) {
      console.log(error)
    }
  }

  // Insert many entries
  async insertMany(entries) {
    try {
      return await instance.collection.insertMany(entries);
    } catch (error) {
      console.log(error)
    }
  }
}
export default DB