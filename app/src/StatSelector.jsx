/**
 * @author Raagav Prasanna
 */

// Drop down list component to select a stat to compare
export default function StatSelector(props) {

  const options = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed']

  return (
    <div>
      <br/>
      <select className="stat_selector" onChange={(event) => {
        props.selectedStatCallback(event.target.value)
      }}>
        {options.map( (elem, ind) => {
          return (
            <option key={ind}>{elem}</option>
          )
        })}
      </select>
    </div>
  )
}