var mongoose = require('mongoose');

var semesterSchema = new mongoose.Schema({
    _id: String,
    semester: String,
    semester_time: String,
    courses: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('semester', semesterSchema);