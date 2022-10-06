const express = require("express") // import express
const Bike = require('../models/bikes')


const router = express.Router()


router.get("/", (req, res) => {

    Bike.find({})
        .then(bikes => {
          
            res.json({ bikes: bikes })
        })
        .catch(err => console.log(err))
})

router.post("/", (req, res) => {

    req.body.owner = req.session.userID

    Bike.create(req.body)
        .then(bike => {
            res.status(201).json({ bike: bike.toObject() })
        })
        .catch(error => console.log(error))
})

router.get('/mine', (req, res) => {

    Bike.find({ owner: req.session.userId})
        .then(bikes => {
            res.status(200).json({ bikes: bikes})
        })
        .catch(error => res.json(error))
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
router.delete("/:id", (req, res) => {
    
    const id = req.params.id
    
    Bike.findById(id)
        
    .then(bike => {
        if (bike.owner == req.session.userId){
            res.sendStatus(204)
            return bike.deleteOne()
        } else {
            res.sendStatus(401)
        }
        
    })
    .then(() => {
        res.sendStatus(204)
    })
    // send the error if not
    .catch(err => res.json(err))
})

  
router.get("/:id", (req, res) => {
    const id = req.params.id

    Bike.findById(id)
        .populate('comments.author', 'username')
        .then(bike => {
            res.json ({bike: bike })
        })
        .catch(err => console.log(err))
})

module.exports = router