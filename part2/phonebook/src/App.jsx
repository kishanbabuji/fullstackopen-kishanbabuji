import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const allNames = persons.map(person => person.name)
    if(allNames.includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(n => n.name === newName)
        const changedPerson = { ...person, number: newNumber }
        personService
        .update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(
            `${changedPerson.name}'s number changed`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(() => {
          setErrorMessage(
            `Information of ${changedPerson.name} has already been removed from the server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }
      return
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setSuccessMessage(
          `Added ${returnedPerson.name}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const toggleDeletionOf = person => {
    if (window.confirm(`Delete ${person.name} ?`)){
      personService
      .remove(person.id)
      .then(response => {
        console.log(response)
        setPersons(persons.filter(n => n.id !== person.id))
      })
      .catch (error => {
        console.log(error)
      })
    }
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} className={'success'}/>
      <Notification message={errorMessage} className={'error'}/>
      <Filter value={filter} onChange={handleFilterChange}/>
      <h3>add a new</h3>
      <Form onSubmit={addName} nameValue ={newName} nameChange={handleNameChange} numberValue={newNumber} numberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons={personsToShow} toggle={toggleDeletionOf}/>
    </div>
  )
}

export default App