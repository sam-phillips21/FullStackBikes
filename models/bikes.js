const mongoose = require("./connection")

const {Schema, model } = mongoose

const bikeSchema = new Schema({
    style: String,
    color: String,
    fast: Boolean
})

const Bike = model("bike", bikeSchema)

module.exports = Bike