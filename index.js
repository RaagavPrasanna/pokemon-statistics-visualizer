const { MongoClient } = require("mongodb");
let client = new MongoClient(process.env.ATLAS_URI);

async function run() {
    let database = client.db('placeholder');
    let pkmn = database.collection('pokemon');
    let query = { name: 'Porygon' };
    let p = await pkmn.findOne(query);
    console.log(p);
}