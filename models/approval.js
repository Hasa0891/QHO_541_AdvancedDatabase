const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const approvalSchema = new Schema({
    organization: {type: Schema.Types.ObjectId, ref: "Organization", required: true},
    country: {type: String, required: true},
    address: {type: String},
    telephone: {type: String, maxLength: 16, required: true},
    docs_url: {type:String, required: true},
    status: {type: String, default:"pending", enum:["pending","approved","decline"]},
    requestDate: {type: Date, default: Date.now},
    approvedDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Approval', approvalSchema);