require('dotenv').config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const Person = require("./models/person")

app.use(express.json())
app.use(express.static("build"))
app.use(cors())
app.use(morgan("dev"))

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

app.get("/api/persons/:uid" , (req,res,next) => {
  Person.findById(req.params.uid)
  .then(person => {
    if(person){
      res.json(person)
    }
    else{
      res.status(404).end()
    }
  })
  .catch(err => {
    next(err)
  })
})

app.post("/api/persons" , (req , res , next) => {
  
  const body = req.body
  
  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }
  
  const person = new Person({
    name : body.name,
    number : body.number,
  })
  
  person.save()
    .then(savedperson => {
      res.json(savedperson)
    })
    .catch(err => next(err))
})

app.put("/api/persons/:id" , (req, res , next) => {
  const body = req.body
  
  const note = {
    name : body.name,
    number : body.number,
  }
  
  Person.findByIdAndUpdate(req.params.id , note , {new : true})
  .then(updatedPerson => {
    res.json(updatedPerson)
  })
  .catch(error => next(error))
})

app.delete("/api/persons/:haturi" , (req , res , next) => {
  Person.findByIdAndRemove(req.params.haturi)
  .then(result => {
    res.status(204).end("Delete successful")
  })
  .catch(error => {
    next(error)
  })
})

const errorHandler = (error , req, res , next) => {
  console.log(error.message)

  if(error.name === 'CastError'){
    return res.status(400).send({ error : "malformatted id"})
  }
  else if(error.name === 'ValidationError'){
    return res.status(400).send("<h2>Length of a name must be at least 3 characters long</h2>")
  }

  next(error)
}

app.use(errorHandler)

let PORT = process.env.PORT

app.listen(PORT || 3001 , () => {
  console.log(`Listening now at localhost:${PORT || 3001}`)
})
