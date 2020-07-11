const express = require('express');
const { response } = require('express');
var morgan = require('morgan')
var fs = require('fs')
var path = require('path')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status(:response-time ms) :body - :date '))

let persons = [
    {
      id: 1,
      number: "81 29 2018",
      name: "Andrei Pirvan",
    },
    {
      id: 2,
      number: "60 88 44 88",
      name: "Andreea Pirvan",
    },
    {
      id: 3,
      number: "71 13 12 34",
      name: "Elena Pirvan",
    },
  ];

app.get('/info', (req, res) => {
    const message = `<p>The phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`

    res.send(message)
})

app.get('/api/persons', (req, res) => {
   res.json(persons)
})

app.get('/api/persons/:id', (req, res) => { 
    const id = Number(req.params.id)

    const maxId = Math.max(...persons.map(x => x.id)) 
    if(id > maxId || id < 0) 
    {
      return res.status(404).json({error: 'resource not found'})
    }
    
    const result = persons.find(x => x.id === id)
    res.json(result)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)

  const maxId = Math.max(...persons.map(x => x.id))
  if(id > maxId || id <= 0)
  {
    return res.status(404).json({error: 'resource not found'})
  }

  persons = persons.filter( x => x.id !== id)

  res.status(204).end()
})

const generateId = () => {
  const maxId = persons.length > 0 ? 
    Math.max(...persons.map(x => x.id)) 
    : 0

  return maxId + 1
} 

app.post('/api/persons', (req, res) => {
    const body = req.body
    
    if(!body.name || !body.number)
    {
      return res.status(404).json({error: 'missing name or number'}) 
    }

    var existing = persons.find( x => x.name === body.name)
    if(existing)
    {
      return res.status(404).json({error: 'name must be unique'})
    }
    const person = {
      name:  body.name,
      number: body.number,
      id: generateId(),
    }

    persons = persons.concat(person)

    res.json(person)
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`The app is listening on port : ${PORT}`))