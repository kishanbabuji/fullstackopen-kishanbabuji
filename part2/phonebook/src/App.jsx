import { useState } from 'react'
const Person = ({person}) => {
  return (
    <p>
    {person.name}
    </p>
    
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas'}
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      id: persons.length + 1,
      name: newName
    }
    
    const allNames = persons.map(person => person.name)
    if(allNames.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <Person key={person.id} person = {person} />
        )}
      </ul>
    </div>
  )
}

export default App