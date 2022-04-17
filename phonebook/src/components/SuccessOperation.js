import React from 'react'

const SuccessOperation = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}

  export default SuccessOperation
