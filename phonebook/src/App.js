import React, { useState,useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import SuccessOperation from './components/SuccessOperation'
import personService from './services/persons'
import './index.css'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')
  const [ successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


 
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
    })
  }, [])
  console.log('render', persons.length, 'persons')


  //Add Person
  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
     // id: persons[persons.length - 1].id + 1   
    }

   const indexPerson = persons.map(person => person.name).indexOf(newName)
   
    if (indexPerson > -1) { 
     
      window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
        const indexSamePerson = persons[indexPerson]

        personService
        .update(indexSamePerson.id, nameObject).then(returnedNote => {
          //console.log(returnedNote)
          setPersons(persons.map(person => person.id !== indexSamePerson.id ? person:{
                ...nameObject,
                id: returnedNote.id,
          }))
          setSuccessMessage(`Updated ${newName}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
      .catch(error => {    
          setErrorMessage(
            `Person validation failed: number: Path number  ${newNumber} is shorter than the minimum allowed length(8)
            or shall not be in its forms 1234556, 1-22334455 and 10-22-334455`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)     
      })
    }else{
    
      personService
        .create(nameObject)
        .then(newPerson => {
        setPersons(persons.concat(newPerson))
        
        setSuccessMessage(`Added ${newName}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000)
        setNewName('')
        setNewNumber('')
    })  
    .catch(error => {
      if(newName.length<3){
        setErrorMessage(
          `Person validation failed: name: Path name  ${newName} is shorter than the minimum allowed length(3)`
         // ` ${error.message}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)  
      }else{
        setErrorMessage(
          `Person validation failed: number: Path number  ${newNumber} is shorter than the minimum allowed length(8)
          or shall not be in its forms 1234556, 1-22334455 and 10-22-334455`
         // ` ${error.message}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)     
        console.log(error.response.data)
      }
      
    }) 
    
  }

} 

const deletePerson = (id, name) => {
  if(window.confirm(`Delete ${name}?`)){
    personService
    .deletePerson(id)
    .then(() =>  {
      setPersons(persons.filter(person => person.id !== id) )
      console.log(newName)
      setSuccessMessage(`Information of ${name} has been removed from the server`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000)
     
    })
    .catch(error => {     
      setErrorMessage(
        `the person '${name}' was already deleted from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)     
      console.log(error.response.data)
      setPersons(persons.filter(n => n.id !== id))
    })
}
}
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const personsToShow = (filter.length === 0) ? persons :
  persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessOperation message={successMessage}/>
      <Notification message={errorMessage}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson}  newName={newName} newNumber={newNumber} 
        handlePersonChange={handlePersonChange}handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
        <Persons persons={personsToShow} removePerson={deletePerson}/>
    </div>
  )
}

export default App

