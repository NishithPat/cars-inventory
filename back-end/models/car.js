const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const carSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    carModel: {
        type: String,
        required: true
    },
    carName: {
        type: String,
        required: true
    },
    sold: {
        type: Boolean,
        required: true
    }
})

carSchema.plugin(AutoIncrement, { inc_field: 'sku' });

module.exports = mongoose.model('Car', carSchema)