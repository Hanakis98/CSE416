var mongoose = require('mongoose');

mongoose.connect("mongodb+srv://ted:123@cse416.23kfi.mongodb.net/CSE416?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

var studentSchema = new mongoose.Schema({ 
  // username: String,
  // password: String,
  first_name: String,
  sbu_id: String
  // GPA: String,
  // degreeRequirements:mongoose.Schema.Types.ObjectId ,
  // coursePlan: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('student', studentSchema,"Users");