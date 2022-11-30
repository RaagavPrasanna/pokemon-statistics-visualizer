import React, {useState, useEffect} from 'react';



export default function SearchBar() {
  
  const [pokeNames, setPokeNames] = useState([])

  useEffect(() => {
    const fetchData = async function() {
      const response = await fetch('http://localhost:5000/pokemonList')
      const result = await response.json()
      let tempPokeList = []
      for(const key in result) {
        tempPokeList.push(result[key])
      }
      setPokeNames(tempPokeList)
    }

    if(pokeNames.length === 0) {
      fetchData()
    }
  }, [])

  return(
    <>
      <div>
      <input required type="search" list="query-list" id="name-query" name="name-query"/>
      <datalist id="query-list">
        {pokeNames.map((name, key) => {
          return (
            <option value={name} key={key}/>
          )
        })}
      </datalist>
      <button id="enter-query">GET STATS</button>
      </div>
    </>
  )
}