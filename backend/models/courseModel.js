const { ObjectId } = require('mongodb');
var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    department: String,
    name: String,
    description : String,
    course_num: String,
    section: String,
    semester: String,
    year: String,
    timeslot : String,   
    credits: String ,
    enrollment: String,
    prerequisites:[String]
});

module.exports = mongoose.model('course', courseSchema,'Courses');

