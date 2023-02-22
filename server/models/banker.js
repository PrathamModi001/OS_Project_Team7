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
        type : Array,
        required: true
    },
    remB : {
        type : Array,
        required: true
    },
    remC : {
        type : Array,
        required: true
    },
    availA : {
        type : Array,
        required: true
    },
    availB : {
        type : Array,
        required: true
    },
    availC : {
        type : Array,
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
