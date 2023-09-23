const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const aggregatedataSchema = new Schema({
    country: {type: String},
    date: {type: Date, default: Date.now},
    confirmed: {type: Number, default:0},
    death: {type: Number, default:0},
    recovered: {type: Number, default:0}
});

module.exports = mongoose.model('Aggregatedata',aggregatedataSchema);