var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    department: String,
    name: String,
    description : String,
    courseNum: String,
    section: String,
    semester: String,
    year: String,
    days: String,
    startTime : String,
    endTime : String,
    credits: String ,
    prerequisites:[String]
});

module.exports = mongoose.model('course', courseSchema);