const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const countrySchema = new Schema({
    name: {type: String, required: true},
    who_region: {type: String}
});

module.exports = mongoose.model('Country', countrySchema);