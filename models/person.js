const mongoose = require("mongoose")

mongoose.set('strictQuery' , false)

const url = process.env.MONGODB_URL

console.log("Connecting to ",url)

mongoose.connect(url)
    .then(result => {
        console.log("Connected to MongoDB")
    })
    .catch(err => {
        console.log("error connecting to MongoDB : ",err.message)
    })

const personSchema = new mongoose.Schema({
    name : {
        type: String,
        minLength: [3, "Minimum length of a name must be 3 characters long"],
        required: true
    
    },
    number : String,
})

personSchema.set('toJSON', {
    transform : (document , returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("person" , personSchema)
