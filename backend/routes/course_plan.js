const { response } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../database.js");
const dbName = "CSE416";
const collectionName = "CoursePlans";
const coursePlanModel = require("../models/coursePlanModel.js")
const courseModel = require("../models/courseModel.js")
const axios = require('axios');
var domain = "http://localhost:3001"

db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
    //update students grade
    
    router.post("/getStudentCoursePlan", (request, response) => {
 
        dbCollection.findOne( {sbu_id: request.body.sbu_id}, (error, result) => {
            response.json(result)
            response.send()
        } ); 
    });

    router.post("/addGrade", (request, response) => {
        //update the course object
        dbCollection.updateOne( {sbu_id: request.body.sbu_id}, { $pull:{courses: {  sbu_id: request.body.sbu_id, course_num: request.body.course_num, department: request.body.department   } }}, (error,result)=> {


            dbCollection.updateOne( {sbu_id: request.body.sbu_id}, { $push:{courses: {  
                sbu_id: request.body.sbu_id,
                course_num: request.body.course_num,
                department: request.body.department,
                grade:request.body.grade  ,
                section: request.body.section  ,
                year: request.body.year, 
                semester: request.body.semester,
                description: request.body.description
            
            } }}, (error, result) => {
                axios
                .post(domain + '/students/regrabCoursePlan', {
                    sbu_id: request.body.sbu_id
                })
                .then(res => {
                })
                .catch(error => {
                })
            } );  



        } );  

        //Now have to update courseplan object and student object
});
    router.get("/allPlans", (request, response) => { // get ALL
        // return updated list
        dbCollection.find().toArray((error, result) => {
            if (error) throw error;
            response.json(result);
        });
    });

    router.post("/newCoursePlan", (request, response) => { // get ALL
        // return updated list
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
            .put(domain + '/students/updateStudentCoursePlan', {
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