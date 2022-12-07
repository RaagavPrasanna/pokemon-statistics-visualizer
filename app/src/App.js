import React, {useState, useEffect} from 'react';
import SearchBar from "./SearchBar"
import PokemonStatChart from "./PokemonStatChart"
import PokemonComparisonChart from "./PokemonComparisonChart"
import StatSelector from "./StatSelector"

function App() {

  const [selectedPokemon, setSelectedPokemon] = useState("")
  const [selectedStat, setSelectedStat] = useState("hp")
  const [pokeNames, setPokeNames] = useState([])
  const [allPokeStats, setAllPokeStats] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      let tempData = []

      let response = await fetch('http://localhost:5000/pokemonDetails')
      let data = await response.json()
      data.forEach((elem) => {
        let tempObj = {}
        let key = elem.name
        tempObj[key] = elem.base_stats
        tempData.push({...tempObj})
      })
      setAllPokeStats([...tempData])
    }
    fetchData()

  }, [])

  const selectedPokemonCallback = ((name) => {
    setSelectedPokemon(name)
  })

  const setPokeNamesCallback = ((list) => {
    setPokeNames([...list])
  })

  const getPokeNamesCallback = () => {
    return pokeNames
  }

  const selectedStatCallback = ((stat) => {
    setSelectedStat(stat)
  })

  const getSelectedStat = () => {
    return selectedStat
  }

  const getSelectedPokemon = () => {
    return selectedPokemon
  }

  const getPokeStatsCallback = () => {
    return allPokeStats
  }


  return (
    <>
      <SearchBar selectedPokemonCallback={selectedPokemonCallback} setPokeNamesCallback={setPokeNamesCallback} getPokeNamesCallback={getPokeNamesCallback}/>
      <PokemonStatChart getSelectedPokemon={getSelectedPokemon}/>
      <StatSelector selectedStatCallback={selectedStatCallback}/>
      <PokemonComparisonChart getSelectedPokemon={getSelectedPokemon} getSelectedStat={getSelectedStat} getPokeNamesCallback={getPokeNamesCallback} getPokeStatsCallback={getPokeStatsCallback}/>
    </>
  )
}

export default App;
