const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const announcementSchema = new Schema({
    title: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref:"Organization", required: true},
    publicationDate: {type: Date, default: Date.now},
    content: {type: String},
    featured_url: {type: String}
});

module.exports = mongoose.model("Announcement", announcementSchema);