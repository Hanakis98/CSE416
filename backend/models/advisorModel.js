var mongoose = require('mongoose');

var advisorSchema = new mongoose.Schema({
    id: String,   
    name: String
});

module.exports = mongoose.model('advisor', advisorSchema);