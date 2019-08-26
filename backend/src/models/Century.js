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
        cities: [
            {
                name: {
                    type: String,
                    require: true
                },
                population: {
                    type: String,
                    require: true

                }
            }
        ]
    }
});

const Century = mongoose.model('Century', CenturySchema);

module.exports = Century;
