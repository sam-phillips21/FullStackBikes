////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Bike = require("../models/bikes")


/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////////
// Routes
////////////////////////////////////////////
// POST
// only loggedIn users can post comments
router.post("/:bikeId", (req, res) => {
    const bikeId = req.params.bikeId

    if (req.session.loggedIn) {
        // we want to adjust req.body so that the author is automatically assigned
        req.body.author = req.session.userId
    } else {
        res.sendStatus(401)
    }
    // find a specific fruit
    Bike.findById(bikeId)
        // do something if it works
        //  --> send a success response status and maybe the comment? maybe the fruit?
        .then(bike => {
            // push the comment into the fruit.comments array
            bike.comments.push(req.body)
            // we need to save the fruit
            return bike.save()
        })
        .then(bike => {
            // res.status(200).json({ bike: bike })
            res.redirect(`/bikes/${bike.id}`)

        })
        // do something else if it doesn't work
        //  --> send some kind of error depending on what went wrong
        .catch(err => res.redirect(`/error?error=${err}`))

})

// DELETE
// only the author of the comment can delete it
router.delete('/delete/:bikeId/:commId', (req, res) => {
    // isolate the ids and save to vars for easy ref
    const bikeId = req.params.bikeId 
    const commId = req.params.commId
    // get the fruit
    Bike.findById(bikeId)
        .then(bike => {
          
            const theComment = bike.comments.id(commId)
            console.log('this is the comment that was found', theComment)
            // make sure the user is logged in
            if (req.session.loggedIn) {
                // only let the author of the comment delete it
                if (theComment.author == req.session.userId) {
                    // find some way to remove the comment
                    // here's another built in method
                    theComment.remove()

                    // res.sendStatus(204)
                    // return the saved fruit
                    // return 
                    bike.save()
                    res.redirect(`/bikes/${bike.id}`)

                } else {
                    const err = 
                    'you%20are%20not%20authorized%20for%20this%20action'
                    res.redirect(`/error?error=${err}`)
                    
                }
            } else {
                const err = 'you%20are%20not%20authorized%20for%20this%20action'
                res.redirect(`/error?error=${err}`)
            }
        })
        // send an error if error
        .catch(err => res.redirect(`/error?error=${err}`))

})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router