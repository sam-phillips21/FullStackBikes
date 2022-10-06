const mongoose = require("./connection")
const User = require('./user')


const commentSchema = require('./comment')

const {Schema, model } = mongoose

const bikeSchema = new Schema({
    style: String,
    color: String,
    fast: Boolean,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [commentSchema]
}, { timestamps: true })


const Bike = model("bike", bikeSchema)

module.exports = Bike