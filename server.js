require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const morgan = require("morgan") // import morgan
const mongoose = require("mongoose") // import mongoose
const path = require("path") // import 

const Bike = require('./models/bikes')

const DATABASE_URL = process.env.DATABASE_URL

const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(DATABASE_URL, CONFIG)

mongoose.connection
    .on("open", () => console.log("Connected to Mongoose"))
    .on("close", () => console.log("Disconnected from Mongoose"))
    .on("error", (error) => console.log("An error occurred: \n", error))

const app = express()

app.use(morgan("tiny"))

app.use(express.urlencoded({ extended: true }))

app.use(express.static("public"))

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Your bike is running, better go out and ride it")
 
})

app.get("/bikes/seed", (req, res) => {

    const startBikes = [
        { style: "Mtb", color: "black", fast: true },
        { style: "Road", color: "red", fast: true },
        { style: "EBike", color: "white", fast: true },
    ]
    Bike.deleteMany({})
        .then(() => {
            
            Bike.create(startBikes)
                .then(data => {
                    res.json(data)
                })
        })
})
app.get("/bikes", (req, res) => {

    Bike.find({})
        .then(bikes => {
          
            res.json({ bikes: bikes })
        })
        .catch(err => console.log(err))
})

app.post("/bikes", (req, res) => {

    Bike.create(req.body)
        .then(bike => {
            res.status(201).json({ bike: bike.toObject() })
        })
        .catch(error => console.log(error))
})
app.put("/bikes/:id", (req, res) => {
    
    const id = req.params.id
    Bike.findByIdAndUpdate(id, req.body, { new: true })
    .then(bike => {
        console.log('the bike from update', bike)
        res.sendStatus(204)
    })
    .catch(err => console.log(err))
})
app.delete("/bikes/:id", (req, res) => {
    
    const id = req.params.id
    
    Bike.findByIdAndRemove(id)
        
        .then(() => {
            res.sendStatus(204)
        })
        
        .catch(err => res.json(err))
})
app.get("/bikes/:id", (req, res) => {
    const id = req.params.id

    Bike.findById(id)
        .then(bike=> {
            res.json ({bike: bike })
        })
        .catch(err => console.log(err))
})
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))