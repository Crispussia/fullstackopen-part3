require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')


app.use(express.json())
app.use(express.static('build'))
app.use(cors())
morgan.token('type', (req) =>{
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status  :res[content-length] - :response-time ms :type '))


app.post('/api/persons', (request, response, next) => {
  const body = request.body
  

  
  const person = new Person({
    name: body.name,
    number:body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => next(error))
})

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
app.get('/info', (request, response) => {
  Person.countDocuments({}, (error, count) => {
    if (error) {
      response.send(error)
    } else {
      const phonebookInfo = `Phonebook has info for ${count} people </p>
                            <p> ${new Date()}</p>`
      response.send(phonebookInfo)
    }
  })
})

app.get('/api/persons', (request, response,next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
  .catch(error => next(error))
})


app.get('/api/persons/:id', (request, response,next) => {
  /*  const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }*/

    Person.findById(request.params.id)
    .then(person => {
    if(person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
  
})


app.delete('/api/persons/:id', (request, response,next) => {
  
   /* const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id) 
    response.status(204).end()*/

    Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, {runValidators: true, context: 'query', new: true })
  .then(updatedPerson => {
    response.json(updatedPerson)
  })
  .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)
  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }  
    else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
  
  
    next(error)
  }
  
  // this has to be the last loaded middleware.
  app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
