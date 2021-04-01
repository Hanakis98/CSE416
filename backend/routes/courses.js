const express = require("express");
const { ObjectID } = require("mongodb");
const router = express.Router();
const db = require("../database.js");
const dbName = "CSE416";
const collectionName = "Courses";


db.initialize(dbName, collectionName, function (dbCollection) { // successCallback

    router.get("/allCourses", (request, response) => {
        // return updated list
        dbCollection.find().toArray((error, result) => {
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
        dbCollection.deleteOne({ department: request.body.department ,   courseNum: request.body.course_num,  semester: request.body.semester, year: request.body.year}, function(error, result) {
            if (error) throw error;
            // send back entire updated list after successful request
            dbCollection.find().toArray(function(_error, _result) {
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });

    router.delete("/deleteAllCourses", (request, response) => {
      
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