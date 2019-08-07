const mongoose = require('../database/index');

const CenturySchema = new mongoose.Schema({
    number: {
        type: String,
        require: true,
        unique: true
    },
    country: {
        name: {
            type: String,
            require: true,
            unique: true
        },
        cities: []
    }
});

const Century = mongoose.model('Century', CenturySchema);

module.exports = Century;
