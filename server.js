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

// app.get("/bikes/seed", (req, res) => {}


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))