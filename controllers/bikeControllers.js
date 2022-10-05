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

    Bike.create(req.body)
        .then(bike => {
            res.status(201).json({ bike: bike.toObject() })
        })
        .catch(error => console.log(error))
})
router.put("/:id", (req, res) => {
    
    const id = req.params.id
    Bike.findByIdAndUpdate(id, req.body, { new: true })
    .then(bike => {
        console.log('the bike from update', bike)
        res.sendStatus(204)
    })
    .catch(err => console.log(err))
})
router.delete("/:id", (req, res) => {
    
    const id = req.params.id
    
    Bike.findByIdAndRemove(id)
        
        .then(() => {
            res.sendStatus(204)
        })
        
        .catch(err => res.json(err))
})
router.get("/:id", (req, res) => {
    const id = req.params.id

    Bike.findById(id)
        .then(bike => {
            res.json ({bike: bike })
        })
        .catch(err => console.log(err))
})

module.exports = router