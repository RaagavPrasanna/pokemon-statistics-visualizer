/*
    Interact with the Pokemon API
    @author Aidan Catriel
    @date Nov 23, 2022
*/
import { Console } from 'console';
import fetch from 'node-fetch';

async function fetchPokemonList(){
    const url = 'https://pokeapi.co/api/v2/pokedex/2/';
    let response = await fetch(url);
    let jsonRaw;
    let jsonRefined = {}
    if(response.ok){
        jsonRaw = await response.json();
        jsonRaw.pokemon_entries.forEach(element => {
            jsonRefined[element.entry_number] = element.pokemon_species.name
        });
        return jsonRefined
        
    }else {
        throw new Error("Status Code:" + response.status);
    }
}

async function fetchPokemonDetails(name){
    const url = 'https://pokeapi.co/api/v2/pokemon/' + name;
    let response = await fetch(url);
    let jsonRaw;
    let jsonRefined = {};
    if(response.ok){
        jsonRaw = await response.json();
        jsonRefined["name"] = jsonRaw.name
        jsonRefined["base_exp_reward"] = jsonRaw.base_experience
        let types = []
        jsonRaw.types.forEach(type => {types.push(type.type.name)})
        jsonRefined["types"] = types

        let stats = {}
        jsonRaw.stats.forEach(stat => {
            stats[stat.stat.name] = stat.base_stat
        })
        jsonRefined["base_stats"] = stats
        jsonRefined["back_sprite"] = jsonRaw["sprites"]["versions"]["generation-i"]["red-blue"].back_transparent
        jsonRefined["front_sprite"] = jsonRaw["sprites"]["versions"]["generation-i"]["red-blue"].front_transparent

        return jsonRefined;
    }else {
        throw new Error("Status Code:" + response.status);
    }
}

export {fetchPokemonList, fetchPokemonDetails};