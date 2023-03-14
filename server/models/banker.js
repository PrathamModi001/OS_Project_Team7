const mongoose = require("mongoose")

const Schema = mongoose.Schema

const bankerSchema = new Schema ({
    A : {
        type : String,
        required: true
    },
    B : {
        type : String,
        required: true
    },
    C : {
        type : String,
        required: true
    },
    pNum : {
        type : Object,
        required: true
    },
    allocA : {
        type : Object,
        required: true
    },
    allocB : {
        type : Object,
        required: true
    },
    allocC : {
        type : Object,
        required: true
    },
    maxA : {
        type : Object,
        required: true
    },
    maxB : {
        type : Object,
        required: true
    },
    maxC : {
        type : Object,
        required: true
    },
    remA : {
        type : Object,
        required: true
    },
    remB : {
        type : Object,
        required: true
    },
    remC : {
        type : Object,
        required: true
    },
    availA : {
        type : Object,
        required: true
    },
    availB : {
        type : Object,
        required: true
    },
    availC : {
        type : Object,
        required: true
    },
    isDeadLock : {
        type : Boolean,
        required: true
    },
    processSequence : {
        type : Object,
        required: true
    },
})

module.exports = mongoose.model('Banker' , bankerSchema)