const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postTypesSchema = new Schema({
    length: {type: String},
    chunckSize: {type: String},
    UploadDate: {type: String},
    filename: {type: String},
    md4: {type: String},
    contentType: {type: String},
});

module.exports = mongoose.model('postTypes', postTypesSchema);
