const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb://fullstack:${password}@cluster0-shard-00-00-sy0oy.azure.mongodb.net:27017,cluster0-shard-00-01-sy0oy.azure.mongodb.net:27017,cluster0-shard-00-02-sy0oy.azure.mongodb.net:27017/react?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const personSchema = new mongoose.Schema({
  number: String,
  name: String,
  id: Number,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);

      mongoose.connection.close();
    });
  });
} else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3] || 'no name',
    number: process.argv[4] || 'no number',
  });

  person
    .save()
    .then((result) => {
      console.log(
        `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
      );
      console.log('person saved!' + result);
      mongoose.connection.close();
    })
    .catch((error) => {
      console.log('error connecting to MongoDB:', error.message);
    });
}


