const mongoose = require('../database/index');

const CenturySchema = new mongoose.Schema({
    number: {
        type: String,
        require: true
    },
    country: {
        name: {
            type: String,
            require: true
        },
        cities: []
    }
});

const Century = mongoose.model('Century', CenturySchema);

module.exports = Century;
