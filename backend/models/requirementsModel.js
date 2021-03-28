var mongoose = require('mongoose');

var reqSchema = new mongoose.Schema({
    _id: String, 
    courses: [mongoose.Schema.Types.ObjectId],
    min_credits: String,
    min_courses: String,
    max_credits: String,
    status: String
});

module.exports = mongoose.model('req', reqSchema);