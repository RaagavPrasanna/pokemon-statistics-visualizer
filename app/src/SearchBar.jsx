import React, {useState, useEffect} from 'react';

/**
 * @author Raagav Prasanna
 */

// Search bar component to select a pokemon
export default function SearchBar(props) {
  
  
  const [inputVal, setInputVal] = useState('')

  const handleChange = event => {
    setInputVal(event.target.value)
  }

  // Use effect to fetch the list of pokemon names
  useEffect(() => {
    const fetchData = async function() {
      const response = await fetch('/pokemonList')
      const result = await response.json()
      let tempPokeList = []
      result.forEach((elem) => {
        tempPokeList.push(elem.name)
      })
      props.setPokeNamesCallback(tempPokeList)
    }

    if(props.getPokeNamesCallback().length === 0) {
      fetchData()
    }
  }, [])

  return(
    <div>
      <br/>
      <input required type="search" list="query-list" id="name-query" name="name-query" onChange={handleChange} className="search_bar"/>
      <datalist id="query-list">
        {props.getPokeNamesCallback().map((name, key) => {
          return (
            <option value={name} key={key}/>
          )
        })}
      </datalist>
      <button id="enter-query" className='search_bar' onClick={() => {

        if(props.getPokeNamesCallback().includes(inputVal)) {
          props.selectedPokemonCallback(inputVal)
        } else {
          alert("Invalid Pokemon!")
        }
      }}>GET STATS</button>
    </div>
  )
}