const express = require("express");
const { ObjectID } = require("mongodb");
const { ObjectId } = require("mongodb");
const router = express.Router();

const db = require("../database.js");
const dbName = "CSE416";
const collectionName = "Courses";
const axios = require('axios');
var domain = "http://localhost:3001"
const courseModel = require("../models/courseModel.js")

db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
    router.post("/getCourse",(request, response) => {
        //get a specific course and if it does not exist, create it
        dbCollection.findOne(            
            {
            department: request.body.department,
            course_num: request.body.course_num,
            semester: request.body.semester,
            year: request.body.year 
            },
            (error, result) => {

            console.log(result)
            if(result==null){
                var newCourse = new courseModel({
                    department: request.body.department,
                    course_num: request.body.course_num,
                    semester: request.body.semester,
                    year: request.body.year,
                    section: request.body.section,
                    timeslot : request.body.timeslot,   
                    credits: request.body.credits ,
                    prerequisites:request.body.prerequisites
                })
                newCourse.save()
                response.json(newCourse)
                return
            }
            else{
                
            console.log("COURSE EXISTS")
            response.json(result)
            return
            }
        });


    });
  
    router.post("/getCourseIfItExists",(request, response) => {
        //get a specific course and if it does not exist, create it
        console.log(request.body.department)
        dbCollection.findOne(            
            {
            department: request.body.department, 
            course_num: request.body.course_num,
            semester: request.body.semester,
            year: request.body.year 
            },
            (error, result) => {
            console.log(result)
            if(result==null){

                response.json({department:null})
                response.send()
                return
            }
            else{
                
            console.log("COURSE EXISTS")
            response.json(result)
            response.send()
            return
            }
        });


    });
    router.post("/scrapeCourseInfo", (request, response) => {
            const regexForCourseShortHand = /[A-Z]{3} \d{3}:/g;
            const regexForCourseCredits = /\d credits/g;
            console.log(request.body.courseInfo.substring(0,10))
            try {

                var courseNameInfo = request.body.courseInfo.match(regexForCourseShortHand)
                var creditsString = request.body.courseInfo.match(regexForCourseCredits)
    
            }
            catch (error) {
            response.send()
                    }
            if(courseNameInfo!=null){
            var department = courseNameInfo[0].substring(0,3);
            var course_num = courseNameInfo[0].substring(4,7)
            try {
                var credits = creditsString[0].substring(0,1)

            } catch (error) {
                var credits=3
            }


            console.log("UPDATING" ,request.body.year, request.body.semester, department,course_num,credits)
            dbCollection.updateOne( {  year: request.body.year , semester: request.body.semester, department: department ,course_num: course_num},
                {$set:{description:request.body.courseInfo, credits: credits}},(error, res) => {
            



                });

            }
            response.send()
            //console.log(request.body.courseInfo)
    });

     
    router.get("/allCourses", (request, response) => {
        // return updated list
        dbCollection.find().toArray((error, result) => {
            if (error) throw error;
            response.json(result);
        });
    });
        
    router.get("/allOfferedCourses", (request, response) => {
        // return updated list 
        dbCollection.find(   ).toArray((error, result) => {
            if (error) throw error;
            response.json(result);
        });
    });
    router.post("/addCourse", (request, response) => {
        const courseItem = request.body;                
        var newCourse = new courseModel(courseItem);;
        newCourse.save()
        response.json();

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