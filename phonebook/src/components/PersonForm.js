import React from 'react'


const PersonForm = ({newName, newNumber, addPerson, handlePersonChange, handleNumberChange }) => {
  return (
    <div>
      
      <form onSubmit={addPerson}>
        <div>
          name:
          <input value={newName}  onChange={handlePersonChange}/>
        </div>      
        <div>
          number: 
          <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div> 
  )     
}

export default PersonForm