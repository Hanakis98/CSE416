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
        //Need To update enrollment here
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
                    prerequisites:request.body.prerequisites ,
                    enrollment: "1"
                })
                newCourse.save()
                response.json(newCourse)
                return
            }
            else{
            var newEnrollment=   (parseInt(result.enrollment)+1 ).toString()

            dbCollection.updateOne(            
                {
                department: request.body.department,
                course_num: request.body.course_num,
                semester: request.body.semester,
                year: request.body.year 
                },{$set:{enrollment:newEnrollment}});
            
                response.json(result)

            return
            }
        });


    }); 
 
    router.post("/getEnrollmentTrend",(request, response) => {
        //get a specific course and if it does not exist, create it
        var enrollmentNumbers = []
        var semesterAndYear = []
        console.log(request.body.department, request.body.course_num)
        dbCollection.find({department:request.body.department, course_num:request.body.course_num }).toArray((error, result) => {
            console.log(result)
            for(var x = 0; x < result.length; x ++){
                enrollmentNumbers.push(result[x].enrollment)
                semesterAndYear.push(result[x].semester + " " + result[x].year)

            }
            response.json({enrollmentNumbers: enrollmentNumbers, semestersAndYears: semesterAndYear})

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
            if(result==null){

                response.json({department:null})
                response.send()
                return
            }
            else{
                
            response.json(result)
            response.send()
            return
            }
        });


    });
    router.post("/scrapeCourseInfo", (request, response) => {
            const regexForCourseShortHand = /[A-Z]{3} \d{3}:/g;
            const regexForCourseCredits = /\d credits/g;
         //   console.log(request.body.courseInfo)
         var preReqs ; 
        if( request.body.courseInfo.includes("Prerequisite"))
            { 
            var preReqString =  request.body.courseInfo.substring(request.body.courseInfo.indexOf("Prerequisite"))
            const regexForPreReqs = /\S\S\S \d\d\d/g;
            var preReqs = request.body.courseInfo.match(regexForPreReqs)
            }
        try 
        {
            
            var courseNameInfo = request.body.courseInfo.match(regexForCourseShortHand)
            var creditsString = request.body.courseInfo.match(regexForCourseCredits)
        }
        catch (error)
        {
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

                //If the course is listed as a prereq
                if(preReqs !=null)
                {
                    while(preReqs[0].includes(course_num)&& preReqs[0].includes(department))
                    {
                       preReqs.shift()

                    }
                }
                dbCollection.updateOne( {  year: request.body.year , semester: request.body.semester, department: department ,course_num: course_num},
                    {$set:{description:request.body.courseInfo, credits: credits,prerequisites:preReqs}},(error, res) => {
                        
                    });

            }
            response.send()
            //console.log(request.body.courseInfo)
    });

     
    router.get("/allCourses", (request, response) => {
        // return updated list
        dbCollection.find().toArray((error, result) => {
            if (error) throw error;
            console.log(result)
            //department,course_num,section,semester,year,timeslot
            for (var x =0; x < result.length; x++){
                console.log(result[x]["department"] + "," + result[x]["course_num"] + "," +result[x]["section"] + "," +result[x]["semester"] + "," +result[x]["year"] + "," +result[x]["timeslot"] )

            }
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
        console.log(newCourse)
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


   
}, function(err) { // failureCallback
    throw (err);
});



module.exports = router