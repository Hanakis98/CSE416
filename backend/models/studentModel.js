var mongoose = require('mongoose');

mongoose.connect("mongodb+srv://ted:123@cse416.23kfi.mongodb.net/CSE416?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const studentSchema = new mongoose.Schema({ 
  first_name: String,
  last_name: String,
  username: String,
  password: String,
  sbu_id: String,
  GPA: String,
  department: String,
  track:String,
  degreeRequirements:mongoose.Schema.Types.ObjectId ,
  coursePlan: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Student', studentSchema,"Students");