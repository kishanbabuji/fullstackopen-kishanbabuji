const Person = ({person, toggleDelete}) => {
    return (
      <p>
        {person.name} {person.number}
        <button onClick={toggleDelete}>delete</button>
      </p>
      
    )
}

const Persons = ({persons, toggle}) => {
  console.log(persons)
    return (
      <ul>
          {persons.map(person => 
            <Person key={person.id} person={person} toggleDelete={() => toggle(person)}/>
          )}
      </ul>
    )
  }
  
export default Persons