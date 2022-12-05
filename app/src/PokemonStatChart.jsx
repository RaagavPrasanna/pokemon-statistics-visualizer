import {React, useEffect, useState} from 'react';
import Plot from 'react-plotly.js'

export default function PokemonStatChart(props) {

  const [data, setData] = useState({"hp": 0, "attack": 0, "defense": 0, "special-attack": 0, "special-defense": 0, "speed": 0})

  useEffect(() => {
    if(props.getSelectedPokemon() === "") {
    } else {
      const fetchData = async function() {
        const response = await fetch(`http://localhost:5000/pokemon?name=${props.getSelectedPokemon()}`)
        const result = await response.json()

        setData({...result.base_stats})
      }
      fetchData()
    }
  }, [props.getSelectedPokemon()])

  return (
    <>
      <h1>{props.getSelectedPokemon()}</h1>
      <Plot
        data={[
          {type: 'bar',
          x: ['HP', 'Attack', 'Defense', 'Special-Attack', 'Special-Defense', 'Speed'],
          y: [data.hp, data.attack, data.defense, data['special-attack'], data['special-defense'], data.speed]
        }
        ]}
        layout={{width: 1000, height:500, title:"Stats"}}
      />
    </>
  )
}