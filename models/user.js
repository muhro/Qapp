const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, unique: true},
    password: {type: String, required: true},
    posts: {type: Schema.Types.ObjectId, ref: 'postTypes'},
});

module.exports = mongoose.model('User', userSchema);
