const mongoose = require("mongoose")

const Schema = mongoose.Schema

const MRUschema = new Schema ({
    refString: {
        type: Object,
        required: true
    },
    frame: {
        type: Number,
        required: true
    },
    hit: {
        type: Number,
        required: true
    },
    pageFault: {
        type: Number,
        required: true
    },
    totalPages: {
        type: Object,
        required: true
    },
})

module.exports = mongoose.model('MRU' , MRUschema)