const express = require("express");
const { ObjectID } = require("mongodb");
const { ObjectId } = require("mongodb");
const router = express.Router();
const db = require("../database.js");
const dbName = "CSE416";
const collectionName = "Courses";
const axios = require('axios');
var domain = "http://localhost:3001"

db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
    
    router.post("/scrapeCourseInfo", (request, response) => {
            console.log(request.body.courseInfo)
    });

     
    router.get("/allCourses", (request, response) => {
        // return updated list
        dbCollection.find().toArray((error, result) => {
            if (error) throw error;
            response.json(result);
        });
    });


    router.post("/addGrade", (request, response) => {
        
           dbCollection.updateOne( { sbu_id: request.body.sbu_id, course_num: request.body.course_num, department: request.body.department}, {$set:{grade:request.body.grade}},(error, res) => {
                if (error) throw error;
                //update the course object
          

                axios
                .post(domain + '/coursePlans/addGrade', {
                    sbu_id: request.body.sbu_id,
                    course_num: request.body.course_num,
                    department: request.body.department,
                    grade:request.body.grade  ,
                    section: request.body.section  ,
                    year: request.body.year,
                    semester: request.body.semester,
                    description: request.body.description
                    })
                .then(res => {
                    response.send()
                })
                .catch(error => {
                })
                //Now have to update courseplan object and student object


            } );
    


    });
    router.get("/allOfferedCourses", (request, response) => {
        // return updated list 
        dbCollection.find( {sbu_id:"OFFERING"}  ).toArray((error, result) => {
            if (error) throw error;
            response.json(result);
        });
    });
    router.post("/addCourse", (request, response) => {
        const courseItem = request.body;
        // return updated list
        dbCollection.insertOne(courseItem, (error, result) => { // callback of insertOne
            if (error) throw error;
            // return updated list
            dbCollection.find().toArray((_error, _result) => { // callback of find
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });
    router.delete("/deleteCourse", (request, response) => {
        const courseObjectID = request.body;

        console.log("Delete item: ", courseObjectID);
        dbCollection.deleteOne({ sbu_id: request.body.sbu_id, department: request.body.department ,   course_num: request.body.course_num,  semester: request.body.semester, year: request.body.year}, function(error, result) {
            if (error) throw error;
            // send back entire updated list after successful request
            dbCollection.find({sbu_id:"OFFERING"} ).toArray(function(_error, _result) {
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });

    router.delete("/deleteAllCourses", (request, response) => {
      
        console.log("Delete All Item");
        dbCollection.deleteMany(
            function(error, result) {
            if (error) throw error;
            // send back entire updated list after successful request
            dbCollection.find().toArray(function(_error, _result) {
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });

    router.delete("/deleteAllOfferedCourses", (request, response) => {
      
        console.log("Delete All Item");
        dbCollection.deleteMany({sbu_id: "OFFERING"},function(error, result) {
            if (error) throw error;
            // send back entire updated list after successful request
            dbCollection.find({sbu_id:"OFFERING"}).toArray(function(_error, _result) {
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });
   
}, function(err) { // failureCallback
    throw (err);
});



module.exports = router