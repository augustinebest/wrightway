const mongoose = require('mongoose');

const SaleSchema = mongoose.Schema({
    person: {
        type: String
    },
    info: [],
    date: {
        type: String
    },
    time: {
        type: String
    }
})

module.exports = mongoose.model('Sale', SaleSchema);