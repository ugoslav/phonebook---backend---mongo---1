const mongoose = require("mongoose")

if(process.argv.length > 5)
{
    console.log("if your name contains fname and lname,enclose the name inside double quotes")
    process.exit(1)
}

const password = process.argv[2]

const nameOfPerson = process.argv[3]

const numberOfPerson = process.argv[4]

const url = `mongodb+srv://Boijohiro_Kimada:${password}@firstcluster.eax81oe.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set("strictQuery" , false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    name : String,
    number : String,
})

const Record = mongoose.model("Person" , noteSchema)

const record = new Record({
    name : nameOfPerson,
    number : numberOfPerson,
})

if(process.argv.length === 5)
{
    record.save().then(result => {
        console.log(`added ${nameOfPerson} with number ${numberOfPerson} to phonebook`)
        mongoose.connection.close()
    })
}

else if(process.argv.length === 3)
{
    Record.find({}).then(result => {
        if(result.length !== 0)
        {
            console.log("Phonebook :-")
            result.forEach(entry => {
                console.log(`${entry.name} ${entry.number}`)
            })
        }
        else
        {
            console.log("Empty database so far ...")
        }
        mongoose.connection.close()
    })
}