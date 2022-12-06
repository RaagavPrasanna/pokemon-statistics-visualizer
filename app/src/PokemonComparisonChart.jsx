import React, {useState, useEffect} from 'react';
import Plot from 'react-plotly.js'

export default function PokemonComparisonChart(props) {

  const [allX, setAllX] = useState([])
  const [allY, setAllY] = useState([])

  const [chosenX, setChosenX] = useState([])
  const [chosenY, setChosenY] = useState([])

  useEffect(() => {
    if(props.getSelectedPokemon() === "") {
      console.log("ignore")
    } else {
      console.log("we good, add data to chart")

      const selectedIndex = props.getPokeNamesCallback().indexOf(props.getSelectedPokemon())

      let allXList = []
      let allYList = []

      let chosenXList = []
      let chosenYList = []
      props.getPokeStatsCallback().forEach((elem, ind) => {
        if(ind === selectedIndex) {
          // setChosenX(ind)
          chosenXList.push(ind + 1)
          chosenYList.push(elem[Object.keys(elem)[0]][props.getSelectedStat()])
          // setChosenY(elem[props.getSelectedStat()])
        } else {
          // setAllX(ind)
          // setAllY(elem[props.getSelectedStat()])
          allXList.push(ind +1)
          console.log(props.getSelectedStat())
          console.log(elem)
          allYList.push(elem[Object.keys(elem)[0]][props.getSelectedStat()])
        }
      })

      // console.log(allXList)
      // console.log(allYList)
      // console.log(chosenXList)
      // console.log(chosenYList)

      setAllX([...allXList])
      setAllY([...allYList])

      setChosenX([...chosenXList])
      setChosenY([...chosenYList])
    }
  }, [props.getSelectedPokemon(), props.getSelectedStat()])


  let allTrace = {

  }

  return (
    <div>
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