import React from 'react'
const Persons = ({ persons, removePerson}) => {
    
    const display = () => 
    persons.map((person) => 
    <div key={person.id}>
        {person.name}{"  "}
        {person.number} {"  "}  
        <button onClick={()=> removePerson(person.id, person.name)}> delete</button>     
    </div>) 
      return (
          <>
          {display()}
          </>
      )
  } 
export default Persons