require('dotenv').config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const Person = require("./models/person")

app.use(express.json())
app.use(cors())
app.use(express.static("build"))
app.use(morgan("dev"))

const exampleWare = (req,res,next) => {
    console.log("An example middleware was used in here")
    next()
}

app.use(exampleWare)

let persons = 
[
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
    },
    {
        "id" : 5,
        "name" : "Robert Schnell",
        "number" : "444-4456-3562"
    },
    {
        "id" : 6,
        "name" : "Emraan Hashmi",
        "number" : "442-5256-9295"
    }
]

app.get("/api/persons" , (req,res) => {
    Person.find({}).then(people => {
        res.json(people)
    })
})

app.get("/api/info" , (req , res) => {
    let date = new Date()
    Person.find({}).then(people => {
        res.end(`Phonebook has info for ${people.length} people\n\n${date}`)
    })
})

app.get("/api/persons/:uid" , (req,res) => {
    Person.findById(req.params.uid).then(person => {
        res.json(person)
    })
})

app.delete("/api/persons/:haturi" , (req , res) => {
    const kolabaeng = Number(req.params.haturi)
    console.log(kolabaeng)
    persons = persons.filter(person => person.id !== kolabaeng)
    res.end(`Person with id number ${kolabaeng} was removed from dictionary`)
})

app.post("/api/persons" , (req , res) => {

    const body = req.body

    if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name : body.name,
    number : body.number,
  })

  person.save().then(savedperson => {
    response.json(savedperson)
  })
})

let PORT = process.env.PORT

app.listen(PORT || 3001 , () => {
    console.log(`Listening now at localhost:${PORT || 3001}`)
})