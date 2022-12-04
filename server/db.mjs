import * as dotenv from "dotenv";
dotenv.config();
const dbUrl = process.env.ATLAS_URI;
import MongoClient from "mongodb";

let instance = null;

class DB {
    constructor(){
        //instance is the singleton, defined in outer scope
        if (!instance){
        instance = this;
        this.client = new MongoClient.MongoClient(dbUrl);
        this.db = null;
        this.collection = null;
        }
        return instance;
    }

    async connect(dbname, collName) {
        if (instance.db){
        return;
        }
        await instance.client.connect();
        instance.db = await instance.client.db(dbname);
        console.log("Successfully connected to MongoDB database " + dbname);
        instance.collection = await instance.db.collection(collName)
    }

    async close() {
        await instance.client.close();
        instance = null;
    }

    async readAllNames() {
        const projection = {name: 1}
        const cursor = instance.collection.find().project(projection)
        return await cursor.toArray();
    }

    async readOneEntry(name) {
        return await instance.collection.find({name: {$eq: name}});
    }

    async insertOne(entry) {
        return await instance.collection.insertOne(entry);
    }

    async insertMany(entries) {
        return await instance.collection.insertMany(entries);
    }
}
export default DB