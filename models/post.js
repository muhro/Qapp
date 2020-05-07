const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    header: {type: String, required: true},
    text: {type: String, required: true},
});

module.exports = mongoose.model('Post', postSchema);
