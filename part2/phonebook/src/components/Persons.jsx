const Person = ({person}) => {
    return (
      <p>
        {person.name} {person.number}
      </p>
      
    )
}

const Persons = ({persons}) => {
  console.log(persons)
    return (
      <ul>
          {persons.map(person => 
            <Person key={person.id} person={person} />
          )}
      </ul>
    )
  }
  
export default Persons