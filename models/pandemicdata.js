const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pandemicdataSchema = new Schema({
    date: {type: Date, default: Date.now},
    new_case: {type: Number, default:0},
    death: {type: Number, default:0},
    recovered: {type: Number, default:0},
    country: {type: String},
    organization: {type: Schema.Types.ObjectId, ref:'Organization'}
});

module.exports = mongoose.model('Pandemicdata',pandemicdataSchema);