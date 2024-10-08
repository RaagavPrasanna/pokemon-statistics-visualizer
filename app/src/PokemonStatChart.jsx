import {React, useEffect, useState} from 'react';
import Plot from 'react-plotly.js'

/**
 * @author Raagav Prasanna
 */

// Component to represesent a single pokemon's stats
export default function PokemonStatChart(props) {

  const [data, setData] = useState({"hp": 0, "attack": 0, "defense": 0, "special-attack": 0, "special-defense": 0, "speed": 0})

  // Use effect to fetch the stats if a new pokemon is selected
  useEffect(() => {
    if(props.getSelectedPokemon() === "") {
    } else {
      const fetchData = async function() {
        const response = await fetch(`/pokemon/${props.getSelectedPokemon()}`)
        const result = await response.json()

        setData({...result[0].base_stats})
      }
      fetchData()
    }
  }, [props.getSelectedPokemon()])

  return (
    <div>
      <br/>
      <Plot
        data={[
          {type: 'bar',
          x: ['HP', 'Attack', 'Defense', 'Special-Attack', 'Special-Defense', 'Speed'],
          y: [data.hp, data.attack, data.defense, data['special-attack'], data['special-defense'], data.speed]
        }
        ]}
        layout={{width: 500, height:500, title:"Stats"}}
      />
    </div>
  )
}