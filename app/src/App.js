import React, {useState} from 'react';
import SearchBar from "./SearchBar"
import PokemonStatChart from "./PokemonStatChart"


function App() {

  const [selectedPokemon, setSelectedPokemon] = useState("")

  const selectedPokemonCallback = ((name) => {
    setSelectedPokemon(name)
  })

  const getSelectedPokemon = () => {
    return selectedPokemon
  }

  return (
    <>
      <SearchBar selectedPokemonCallback={selectedPokemonCallback}/>
      <PokemonStatChart getSelectedPokemon={getSelectedPokemon}/>
    </>
  )
}

export default App;
