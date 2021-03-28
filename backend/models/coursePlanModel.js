var mongoose = require('mongoose');

var coursePlanSchema = new mongoose.Schema({
    
    studentId : String,
    courses:[mongoose.Schema.Types.ObjectId]
    
    
});

module.exports = mongoose.model('coursePlan', coursePlanSchema);