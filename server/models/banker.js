const mongoose = require("mongoose")

const Schema = mongoose.Schema

const bankerSchema = new Schema ({
    A : {
        type : Number,
        required: true
    },
    B : {
        type : Number,
        required: true
    },
    C : {
        type : Number,
        required: true
    },
    pNum : {
        type : Number,
        required: true
    },
    allocA : {
        type : Number,
        required: true
    },
    allocB : {
        type : Number,
        required: true
    },
    allocC : {
        type : Number,
        required: true
    },
    maxA : {
        type : Number,
        required: true
    },
    maxB : {
        type : Number,
        required: true
    },
    maxC : {
        type : Number,
        required: true
    },
    remA : {
        type : Number,
        required: true
    },
    remB : {
        type : Number,
        required: true
    },
    remC : {
        type : Number,
        required: true
    },
    availA : {
        type : Number,
        required: true
    },
    availB : {
        type : Number,
        required: true
    },
    availC : {
        type : Number,
        required: true
    },
    isDeadLock : {
        type : Boolean,
        required: true
    },
    processSequence : {
        type : Array,
        required: true
    },
})

module.exports = mongoose.model('Banker' , bankerSchema)
