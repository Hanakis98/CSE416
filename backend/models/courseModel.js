var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    sbu_id:String,
    department: String,
    name: String,
    description : String,
    course_num: String,
    section: String,
    semester: String,
    year: String,
    timeslot : String,
    grade: String,
   
    credits: String ,
    prerequisites:[String]
});

module.exports = mongoose.model('course', courseSchema,'Courses');

