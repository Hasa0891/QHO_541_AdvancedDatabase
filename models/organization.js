const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    name: {type: String, required: true},
    country : {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    approved: {type: Boolean, default: false}
});

module.exports = mongoose.model('Organization', organizationSchema);