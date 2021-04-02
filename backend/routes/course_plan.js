const { response } = require("express");
const express = require("express");
const { ObjectID } = require("mongodb");
const router = express.Router();
const db = require("../database.js");
const dbName = "CSE416";
const collectionName = "CoursePlans";
const coursePlanModel = require("../models/coursePlanModel.js")
const courseModel = require("../models/courseModel.js")
const axios = require('axios')
db.initialize(dbName, collectionName, function (dbCollection) { // successCallback

    // Get all the courseplans
    router.get("/allPlans", (request, response) => { // get ALL
        // return updated list
        dbCollection.find().toArray((error, result) => {
            if (error) throw error;
            response.json(result);
        });
    });

    // add a course to a specified students course plan 
    router.post("/createCoursePlanForStudent", (request, response) => {
        //Update the courseplan
        const newPlan = new coursePlanModel({
           sbu_id:request.body.sbu_id,
           courses:[]
        });
        newPlan.save(function(err, doc) {
            if (err) return console.error(err);
           });

           //Update students courseplan since we just created a new course plan for them
           axios
           .post('http://localhost:3001/students/updateStudentCoursePlan', {
            sbu_id:request.body.sbu_id,
            coursePlan: newPlan
                })
           .then(res => {
             console.log(`statusCode: ${res.statusCode}`)
             console.log(res)
           })
           .catch(error => {
             console.error(error)
           })

    });

    //Adds a course to a specified Students course plan
    router.post("/addCourseToPlan", (request, response) => {
        var newCourse = new courseModel({
            sbu_id:request.body.sbu_id,
            department: request.body.department,
            description : "",
            courseNum: request.body.courseNum,
            section: request.body.section,
            semester: request.body.semester,
            year: request.body.year,
            timeslot : request.body.timeslot,
            grade: request.body.grade,
            credits: request.body.credits ,
            prerequisites:[]
        });
        newCourse.save(function(err, doc) {
            if (err) return console.error(err);
          });

        dbCollection.updateOne({ sbu_id: request.body.sbu_id }, { $push: {courses : newCourse} }, (error, result) => {
            if (error) throw error;
            // send back entire updated list, to make sure frontend data is up-to-date
            dbCollection.find().toArray(function(_error, _result) {
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });

    //Delete one plan with id
    router.delete("/deletePlan/", (request, response) => {
        const planID = request.body.id;
        console.log("Delete item with id: ", planID);
        dbCollection.deleteOne({ _id: ObjectID(planID) }, function(error, result) {
            if (error) throw error;
            // send back entire updated list after successful request
            dbCollection.find().toArray(function(_error, _result) {
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });

    //check and return if there is a course plan for a spcified student
    router.post("/checkPlanForStudent/", (request, response) => {
        const id = request.body.sbu_id;
        var found = dbCollection.findOne({ sbu_id: id }, function(error, result) {
            if (error) throw error;
            response.json(result);
            response.send()

        });
    });

    //Self explanatory
    router.delete("/deleteAllPlans", (request, response) => {
        console.log("Delete All Item");
        dbCollection.deleteMany(function(error, result) {
            if (error) throw error;
            // send back entire updated list after successful request
            dbCollection.find().toArray(function(_error, _result) {
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });

    
   
}, function(err) { // failureCallback
    throw (err);
});

module.exports = router