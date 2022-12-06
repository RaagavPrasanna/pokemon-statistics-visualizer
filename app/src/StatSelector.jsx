export default function StateSelector(props) {

  const options = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed']

  return (
    <select onChange={(event) => {
      props.selectedStatCallback(event.target.value)
    }}>
      {options.map( (elem, ind) => {
        return (
          <option key={ind}>{elem}</option>
        )
      })}
    </select>
  )
}