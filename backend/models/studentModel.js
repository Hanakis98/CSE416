const { ObjectId } = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect("mongodb+srv://ted:123@cse416.23kfi.mongodb.net/CSE416?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const studentSchema = new mongoose.Schema({ 
  first_name: String,
  last_name: String,
  email:String,
  password: String,
  sbu_id: String,  
  GPA: String,
  department: String,
  track:String,
  // degreeRequirements:{},
  coursePlan: Object,
  entry_semester: String,
  entry_year: String,
  graduation_semester: String,
  graduation_year: String,
  completeCoursePlan: Boolean,
  comments:[String]
});

module.exports = mongoose.model('Student', studentSchema,"Students");