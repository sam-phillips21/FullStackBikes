const express = require("express") // import express
const Bike = require('../models/bikes')


const router = express.Router()


router.get("/", (req, res) => {

    Bike.find({})
        .populate("comments.author", "username")
        .then(bikes => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
          
            // res.json({ bikes: bikes })
            res.render('bikes/index', {bikes, username, loggedIn, userId})
        })
        .catch(err => console.log(err))
})
router.get('/new', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId

    res.render('bikes/new', { username, loggedIn, userId })
})
router.post("/", (req, res) => {
    req.body.fast = req.body.fast === 'on' ? true : false
    req.body.owner = req.session.userID

    Bike.create(req.body)
        .then(bike => {
            // res.status(201).json({ bike: bike.toObject() })
            res.redirect('/bikes')
        })
        .catch(error => console.log(error))
})

router.get('/mine', (req, res) => {

    Bike.find({ owner: req.session.userId})
        .then(bikes => {
            // res.status(200).json({ bikes: bikes})
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId

            res.render('bikes/index', { bikes, username, loggedIn, userId })
        })
        .catch(error => res.json(error))
})

router.get("/edit/:id", (req, res) => {
    res.send('edit page')
})

router.put("/:id", (req, res) => {
    
    const id = req.params.id


    Bike.findById(id)
    .then(bike => {
        if (bike.owner == req.session.userId){
            res.sendStatus(204)
            return bike.updateOne(req.body)
        } else {
            res.sendStatus(401)
        }
      
    })
    .catch(err => console.log(err))
})
// router.delete("/:id", (req, res) => {
    
//     const id = req.params.id
    
//     Bike.findById(id)
        
//     .then(bike => {
//         if (bike.owner == req.session.userId){
//             res.sendStatus(204)
//             return bike.deleteOne()
//         } else {
//             res.sendStatus(401)
//         }
        
//     })
//     .then(() => {
//         res.sendStatus(204)
//     })
//     // send the error if not
//     .catch(err => res.json(err))
// })
router.delete('/:id', (req, res) => {
    
    const bikeId = req.params.id

    Bike.findByIdAndRemove(bikeId)
        .then(bike => {
            // if the delete is successful, send the user back to the index page
            res.redirect('/bikes')
        })
        .catch(error => {
            res.json({ error })
        })
})
  
router.get("/:id", (req, res) => {
    const id = req.params.id

    Bike.findById(id)
        .populate('comments.author', 'username')
        .then(bike => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            // res.json ({bike: bike })
            res.render('bikes/show', { bike, username, loggedIn, userId })
        })
        .catch(err => console.log(err))
})

module.exports = router