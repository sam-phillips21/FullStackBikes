
require("dotenv").config() // Load ENV Variables
const express = require("express") // import express

const path = require("path") // import 
const BikeRouter = require('./controllers/bikeControllers')
const UserRouter = require('./controllers/userControllers')
const middleware = require('./utils/middleware')


const app = express()


middleware(app)

app.get("/", (req, res) => {
    res.send("Your bike is running, better go out and ride it")
 
})

app.use('/bikes', BikeRouter)
app.use('/users', UserRouter)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))