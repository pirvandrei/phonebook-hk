require('dotenv').config();
const express = require('express');
var morgan = require('morgan');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const Person = require('./models/person');

mongoose.set('useFindAndModify', false);
app.use(cors());
app.use(express.static('build'));
app.use(express.json());

morgan.token('body', function getBody(req) {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status(:response-time ms) :body - :date '));

app.get('/info', (req, res) => {
  Person.estimatedDocumentCount((error, count) => {
    console.log(count);
    const message = `<p>The phone book has info for ${count} people</p>
    <p>${new Date()}</p>`;
  
    res.send(message);
  });
});

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then((people) => {
      res.json(people);
    })
    .catch((error) => {
      console.log('error connecting to MongoDB: ', error.message);
      res.status(404).end();
    });
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person
    .findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (req, response, next) => {
  const body = req.body;

  if (!body.name || !body.number ) {
    return response.status(404).json({ error: 'missing name or number' });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    return savedPerson.toJSON();  
  })
    .then( savedAndFormattedPerson => {
      response.json(savedAndFormattedPerson);
    } )
    .catch( error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedNote) => response.json(updatedNote))
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name == 'CastError') {
    return response.status(400).send({ error: 'malformed id' });
  }else if ( error.name == 'ValidationError') {
    return response.status(404).send({ error: error.message});
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`The app is listening on port : ${PORT}`));
