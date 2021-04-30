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
            return
        } ); 
    });


    router.post("/addGrade", (request, response) => {
        //update the course object
        console.log("COURSE NUM:",request.body.course_num,request.body.sbu_id)
        dbCollection.findOne( {sbu_id: request.body.sbu_id }, (error,result)=> {
            console.log(result.courses)
            updateCourses = result.courses
            for ( var i  = 0; i < result.courses.length; i++){
                if(result.courses[i].course_num = request.body.course_num){
                    updateCourses[i].grade = request.body.grade
                }
            }

            dbCollection.updateOne( {sbu_id: request.body.sbu_id} ,{$set:{ courses:updateCourses} }, (e,r)=> {
                console.log("T",r.courses)
                axios
                .post(domain + '/students/regrabCoursePlan', {
                    sbu_id: request.body.sbu_id
                })
                .then(res => {
                })
                .catch(error => {
                })
         

            });

        });

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
        response.send()
        
    });
    router.post("/addCourseToPlan", (request, response) => { // get ALL
        // console.log(request.body)
        //add this course to the course plan. If it exists already just grab it
        //but if it doesnt then create it
        axios
        .post(domain + '/courses/getCourse', 
        {
            department: request.body.department,
            course_num: request.body.course_num,
            semester: request.body.semester,
            year: request.body.year,
         
        })
        .then(res => {
            dbCollection.updateOne({ sbu_id: request.body.sbu_id }, {
                    $push: 
                    {courses : 
                        {   
                            newCourse:{
                                prerequisites: res.data.prerequisites,
                                department: res.data.department,
                                course_num: res.data.course_num,
                                semester: res.data.semester,
                                year: res.data.year,
                                section: res.data.section,
                                timeslot: res.data.timeslot,
                                section: res.data.section,
                                description: res.data.description,
                                credits: res.data.credits
                            }, 
                            grade: request.body.grade, 
                            hasTaken:false
                        }
                    } 
                });
                response.send()

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