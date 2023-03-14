const mongoose = require("mongoose")

const Schema = mongoose.Schema

const scanSchema = mongoose.Schema({
    pId : {
        type: Object,
        required: true
    },
    trackNum : {
        type: Object,
        required: true
    },
    headPoint : {
        type: Number,
        required: true
    },
    mode : {
        type: String,
        required: true
    },
    direction : {
        type: String,
        required: true
    },
    xAxis : {
        type: Object,
        required: true
    },
    yAxis : {
        type: Object,
        required: true
    },
    completedProcess : {
        type: Object,
        required: true
    },
    
})

module.exports = mongoose.model('Scan-cScan' , scanSchema)