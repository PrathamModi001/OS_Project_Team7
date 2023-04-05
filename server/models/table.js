const mongoose = require("mongoose")

const Schema = mongoose.Schema

const processSchema = new Schema({
    index : {
        type : Number,
        required: true
    },
    id : {
        type: Number,
        required: true
    },
    at : {
        type: Number,
        required: true
    },
    bt: {
        type: Number,
        required: true
    },
    ct: {
        type: Number,
        required: true
    },
    tat: {
        type: Number,
        required: true
    },
    wt: {
        type: Number,
        required: true
    }
})

const resultSchema = new Schema ({
    result : [processSchema]
})

module.exports = mongoose.model('RR' , resultSchema)
