
const mongoose = require('./connection')
const Bike = require('./bikes')



// router.get("/bikes/seed", (req, res) => {

const db = mongoose.connection 

db.on('open', () => {
    const startBikes = [
        { style: "Mtb", color: "black", fast: true },
        { style: "Road", color: "red", fast: true },
        { style: "EBike", color: "white", fast: true },
    ]
    Bike.deleteMany({})
         .then(deletedBikes => {
            console.log('this is what is removed', deletedBikes)
            
        Bike.create(startBikes)
            .then(data => {
                console.log('created bikes', data)
                db.close()
         })
    
        .catch(error => {
            console.log(error)
            db.close()
             })
        })
        .catch(error => {
            console.log(error)
            db.close()
        })
    })


