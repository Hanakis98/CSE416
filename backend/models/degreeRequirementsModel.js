const { Long, String } = require('mongodb');
var mongoose = require('mongoose');

var degreeReqSchema = new mongoose.Schema({
    department: String,
    track_topic: String,
    thesis: Boolean,
    project: Boolean,
    version: String,
    minGPA: String,
    minNonElectiveGPA: String,
    minCredits: String,
    recommendation: Boolean,
    timeLimit: String,
    proficencyReqs: [String],
    courseReqs: [String],
    entrySemester: String,
    expectedGradSemester: String,
    hasGraduated: Boolean,
    percentageComplete: String,
    comments: [String],
    coursePlan: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('degreeReq', degreeReqSchema);