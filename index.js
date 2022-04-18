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

let persons= [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.post('/api/persons', (req, res, next) => {
  const newPerson = new Person({
    name: req.body.name,
    number: req.body.number
  })

  newPerson.save().then(response => {
    res.json(response)
  }).catch(error => next(error))
})

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
 

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})


app.get('/api/persons/:id', (request, response) => {
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
  
})


app.delete('/api/persons/:id', (request, response) => {
  
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id) 
    response.status(204).end()
})

  const generateId = () => {
    const minId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    const idRandom=Math.floor(Math.random() * (1000 - minId + 1) + minId); 
    
      return idRandom
   
  }
  


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
