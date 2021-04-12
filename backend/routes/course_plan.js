const { response } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../database.js");
const dbName = "CSE416";
const collectionName = "CoursePlans";
const coursePlanModel = require("../models/coursePlanModel.js")
const courseModel = require("../models/courseModel.js")
const axios = require('axios');

db.initialize(dbName, collectionName, function (dbCollection) { // successCallback

    router.get("/allPlans", (request, response) => { // get ALL
        // return updated list
        dbCollection.find().toArray((error, result) => {
            if (error) throw error;
            response.json(result);
        });
    });

    router.post("/newCoursePlan", (request, response) => { // get ALL
        // return updated list
        console.log("newCOursePlane" + request.body.sbu_id)
        const newCoursePlan =  new coursePlanModel({
            sbu_id: request.body.sbu_id,
            courses:[]
        })
        newCoursePlan.save();
        
    });
    router.post("/addCourseToPlan", (request, response) => { // get ALL

        var newCourse = new courseModel({
            sbu_id:request.body.sbu_id,
            department: request.body.department,
            description : "",
            course_num: request.body.course_num,
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
    router.post("/addAllPlansToTheirStudent", (request, response) => {
        var arr=[]
        dbCollection.find().toArray(function(error, res) {
            arr=res        
            console.log(arr)
            for (var i =0; i < res.length; i++)
            axios
            .put('http://localhost:3001/students/updateStudentCoursePlan', {
             coursePlan: res[i]
                 })
            .then(res => {
            })
            .catch(error => {
            })
        
           
        }); 

    });
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