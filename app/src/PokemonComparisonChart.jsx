import React, {useState, useEffect} from 'react';
import Plot from 'react-plotly.js'


/**
 * @author Raagav Prasanna
 */

// Component for pokemon comparison chart
export default function PokemonComparisonChart(props) {

  const [allX, setAllX] = useState([])
  const [allY, setAllY] = useState([])

  const [chosenX, setChosenX] = useState([])
  const [chosenY, setChosenY] = useState([])

  // Changes the state of the chart if a new pokemon or stat is selected
  useEffect(() => {
    if(props.getSelectedPokemon() === "") {
    } else {

      const selectedIndex = props.getPokeNamesCallback().indexOf(props.getSelectedPokemon())

      let allXList = []
      let allYList = []

      let chosenXList = []
      let chosenYList = []
      props.getPokeStatsCallback().forEach((elem, ind) => {
        if(ind === selectedIndex) {
          chosenXList.push(ind + 1)
          chosenYList.push(elem[Object.keys(elem)[0]][props.getSelectedStat()])
        } else {
          allXList.push(ind +1)
          allYList.push(elem[Object.keys(elem)[0]][props.getSelectedStat()])
        }
      })


      setAllX([...allXList])
      setAllY([...allYList])

      setChosenX([...chosenXList])
      setChosenY([...chosenYList])
    }
  }, [props.getSelectedPokemon(), props.getSelectedStat()])


  return (
    <div>
      <br/>
      <Plot
        data={[
          {
          x: allX,
          y: allY,
          type: 'scatter',
          mode: 'markers',
          marker: {color: 'black'},
          name: 'All Other Pokemon',
          },
          {
            x: chosenX,
            y: chosenY,
            type: 'scatter',
            mode: 'markers',
            marker: {color: 'red'},
            name: props.getSelectedPokemon()
          } 
        ]}
        layout={{width: 500, height: 500, title: 'Compared to all other pokemon', xaxis : {title: {text: 'Pokedex Number'}}, yaxis : {title: {text: `${props.getSelectedStat()}`}}}}
      />
    </div>
  )
}