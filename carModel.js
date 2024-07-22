const mongoose = require('mongoose')

const CarSchema = new mongoose.Schema({
    tenXe : {
        type: String,
        required: true
    },
    gia : {
        type: Number
    },
    tinhTrang : {
        type: String
    },
}) 

const CarModel = new mongoose.model('car', CarSchema)

module.exports = CarModel