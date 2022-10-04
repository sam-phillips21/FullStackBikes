const mongoose = require("mongoose")

const {Schema, model } = mongoose

const bikeSchema = new Schema({
    Style: String,
    color: String,
    fast: Boolean
})

const Bike = model("bike", bikeSchema)

module.exports = Bike