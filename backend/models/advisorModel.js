var mongoose = require('mongoose');

var advisorSchema = new mongoose.Schema({
    _id: String,   
    name: String
});

module.exports = mongoose.model('advisor', advisorSchema);