/*const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}
const password = process.argv[2]
const url =`mongodb+srv://fullstack:${password}@cluster0.dzzxj.mongodb.net/phonebookApp?retryWrites=true&w=majority`


mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  //id: number,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
  //id: 456,
})

person.save().then(result => {
 // console.log('person saved!')
 console.log(`added ${person.name} number ${person.number} to phonebook`)
  //mongoose.connection.close()
})
Person.find({}).then(result=> {
  result.forEach(person => {
    console.log(person)
  })
  mongoose.connection.close()
})*/