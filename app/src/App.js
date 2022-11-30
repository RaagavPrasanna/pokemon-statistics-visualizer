import React, {useState} from 'react';
import SearchBar from "./SearchBar"



function App() {

  const [selectedPokemon, setSelectedPokemon] = useState("")

  const selectedPokemonCallback = ((name) => {
    setSelectedPokemon(name)
  })

  return (
    <>
      <SearchBar setSelectedPokemonCallback={selectedPokemonCallback}/>
    </>
  )
}

export default App;
