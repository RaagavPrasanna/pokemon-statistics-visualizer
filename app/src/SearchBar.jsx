import React, {useState, useEffect} from 'react';



export default function SearchBar(props) {
  
  
  const [inputVal, setInputVal] = useState('')

  const handleChange = event => {
    setInputVal(event.target.value)
  }

  useEffect(() => {
    const fetchData = async function() {
      const response = await fetch('http://localhost:5000/pokemonList')
      const result = await response.json()
      let tempPokeList = []
      // for(const key in result) {
      //   tempPokeList.push(result["name"])
      // }
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
    <>
      <div>
        <input required type="search" list="query-list" id="name-query" name="name-query" onChange={handleChange}/>
        <datalist id="query-list">
          {props.getPokeNamesCallback().map((name, key) => {
            return (
              <option value={name} key={key}/>
            )
          })}
        </datalist>
        <button id="enter-query" onClick={() => {

          if(props.getPokeNamesCallback().includes(inputVal)) {
            props.selectedPokemonCallback(inputVal)
          } else {
            alert("Invalid Pokemon!")
          }
        }}>GET STATS</button>
      </div>
    </>
  )
}