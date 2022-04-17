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

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
 
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})


Person.find({}).then(people => {
  response.json(people.map(person => person.toJSON()))
})
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
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
  
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  else if(persons.map(person => person.name).includes(body.name)) { 
      return response.status(400).json({
          error: 'name must be unique'
      })
    }


  const person = {
      id: generateId(),
    name: body.name,
    number:body.number
  }

  persons = persons.concat(person)

  response.json(person)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
