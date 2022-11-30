import React, {useState, useEffect} from 'react';



export default function SearchBar(props) {
  
  const [pokeNames, setPokeNames] = useState([])
  const [inputVal, setInputVal] = useState('')

  const handleChange = event => {
    setInputVal(event.target.value)
  }

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
        <input required type="search" list="query-list" id="name-query" name="name-query" onChange={handleChange}/>
        <datalist id="query-list">
          {pokeNames.map((name, key) => {
            return (
              <option value={name} key={key}/>
            )
          })}
        </datalist>
        <button id="enter-query" onClick={() => {

          if(pokeNames.includes(inputVal)) {
            props.selectedPokemonCallback(inputVal)
            console.log("set callback val")
          } else {
            alert("Invalid Pokemon!")
          }
        }}>GET STATS</button>
      </div>
    </>
  )
}