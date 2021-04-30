var mongoose = require('mongoose');

var coursePlanSchema = new mongoose.Schema({
    
    sbu_id : String,
    courses:[
        {Object,
        grade: "",
        hasTaken: false}
    ]
    
    
});

module.exports = mongoose.model('CoursePlans', coursePlanSchema,'CoursePlans');