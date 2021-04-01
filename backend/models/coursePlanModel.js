var mongoose = require('mongoose');

var coursePlanSchema = new mongoose.Schema({
    
    sbu_id : String,
    courses:[Object]
    
    
});

module.exports = mongoose.model('CoursePlans', coursePlanSchema,'CoursePlans');