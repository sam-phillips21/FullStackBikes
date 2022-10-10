
require("dotenv").config() // Load ENV Variables
const express = require("express") // import express

const path = require("path") // import 
const BikeRouter = require('./controllers/bikeControllers')
const UserRouter = require('./controllers/userControllers')
const CommentRouter = require('./controllers/commentControllers')
const middleware = require('./utils/middleware')


// const app = express()
const app = require('liquid-express-views')(express())

middleware(app)

app.get("/", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/bikes')
    } else {
        res.render('index.liquid')
    }
    // res.send("Your bike is running, better go out and ride it")
//  res.render('index.liquid')
})

app.use('/bikes', BikeRouter)
app.use('/comments', CommentRouter)
app.use('/users', UserRouter)

app.get('/error', (req, res) => {
    const {username, loggedIn, userId } = req.session
    const error = req.query.error || 'This page does not exist'

    res.render('error.liquid', {error, username, loggedIn,userId})
})

app.all('*', (req, res) => {
    res.redirect('/error')
})

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))