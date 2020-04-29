const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postTypesSchema = new Schema({
    length: String,
    chunckSize: String,
    UploadDate: String,
    filename: String,
    md4: String,
    contentType: String,
});

module.exports = mongoose.model('postTypes', postTypesSchema);
