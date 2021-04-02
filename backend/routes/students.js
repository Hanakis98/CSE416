const express = require("express");
const router = express.Router();
const db = require("../database.js");
const dbName = "CSE416";
const collectionName = "Students";
const studentModel = require("../models/studentModel.js");
const jwt = require("jsonwebtoken");
const keys = require("../keys.js");
const axios = require("axios")
const bcrypt = require("bcryptjs")
mongoose = require("mongoose")

const cookieParser = require("cookie-parser");
router.use(cookieParser())

db.initialize(dbName, collectionName, function (dbCollection) { // successCallback

    router.post("/login", (req, res) => {
        const idField = req.body.sbu_id;
        const providedPassword1 = (req.body.password );
       
        //if user doesnt exist, set cookies to false and 0
        if(  dbCollection.findOne({ sbu_id:idField,password:providedPassword1}) == null){
          res.cookie("token",  false ,{ maxage:300, httpOnly: true , withCredentials: true,path:"/" });
          res.cookie("studentLoggedIn",0,{ maxage:300, httpOnly: false ,path:"/" });
          res.cookie("gpdLoggedIn",0,{ maxage:300, httpOnly: false ,path:"/" });

          res.send(); 
          return
        }
 
          // Check if user exists
          // Check password    
          dbCollection.findOne({ sbu_id:idField,password:providedPassword1}).then(user => {
          //in case it now doesnt exist. redundant but just to be safe ag
            if(user == null){
            res.statusCode=400
            res.cookie("token",  false ,{ maxage:300, httpOnly: true , withCredentials: true,path:"/" });
            res.cookie("studentLoggedIn",0,{ maxage:300, httpOnly: false ,path:"/" });
            res.cookie("gpdLoggedIn",0,{ maxage:300, httpOnly: false ,path:"/" });
            res.send();
          }
         
          //User Exists, lets give them a jwt
              
          // Create JWT Payload
              const payload = {
                sbu_id: idField,
                typeOf: "student"
              };// Sign token

            //Sign the token and send it back as a cookie that cant be accessible through JS as a secuirty measure
              jwt.sign(
                payload,
                keys.secretOrKeyStudents,
                {
                  expiresIn: 3000 // 50  min in seconds
                },
                (err, token) => {
                    if(!err)
                    {
                        res.cookie("token",  token ,{ maxage:1000*1000, httpOnly: true , withCredentials: true,path:"/" });
                        res.cookie("studentLoggedIn",1,{ maxage:1000*1000, httpOnly: false ,path:"/" });
                        res.cookie("gpdLoggedIn",0,{ maxage:300, httpOnly: false ,path:"/" });
                        console.log(token)
                        res.send();
                    }
                }
              );
           });
      });
      
      //Get list of all studetns. Verify the jwt to make sure its an advisor
    router.get("/allStudents", (request, response) => { // get ALL
        var token  = (request.cookies.token)
        jwt.verify(token,keys.secretOrKeyAdvisors)
        dbCollection.find().toArray((error, result) => {
            if (error) throw error;
            response.json(result);
        });
    });

   // Verify the jwt to make sure its an advisor and then add a student
    router.post("/addStudent", (request, response) => {
        var token  = (request.cookies["token"])
        jwt.verify(token,keys.secretOrKeyAdvisors)

        var newStudent = new studentModel({
            first_name : request.body.first_name,
            last_name : request.body.last_name,
            username : request.body.username,
            password : request.body.password,
            sbu_id : request.body.sbu_id,
            email: request.body.email,
            department:  request.body.department,
            track: request.body.track,
            coursePlan: null
        })

        newStudent.save(function(err, doc) {
            if (err) return console.error(err);
            dbCollection.find().toArray((_error, _result) => { // callback of find
                if (_error) throw _error;
                response.json(_result);
            });    });
    });

    // Delete student but first Verify the jwt to make sure its an advisor
    router.delete("/deleteStudent", (request, response) => {
        var token  = (request.cookies.token)
        jwt.verify(token,keys.secretOrKeyAdvisors)

        const itemId = request.body.sbu_id;
        dbCollection.deleteOne({ sbu_id: itemId }, function(error, result) {
            if (error) throw error;
            // send back entire updated list after successful request
            dbCollection.find().toArray(function(_error, _result) {
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });

    //Verify the jwt to make sure its an advisor and delete all
    router.delete("/deleteAllStudent/", (request, response) => {
        var token  = (request.cookies.token)

         jwt.verify(token,keys.secretOrKeyAdvisors)

        dbCollection.deleteMany(function(error, result) {
            if (error) throw error;
            // send back entire updated list after successful request
            dbCollection.find().toArray(function(_error, _result) {
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });

    //get one student. Used to view the student so verify its either the student making the request or the advisor
    router.get("/getOneStudent", (request, response) => {
        var token  = (request.cookies.token)
        var itemID = request.query.user
        
        try {
            var decoded =  jwt.verify(token,keys.secretOrKeyStudents)
             itemId = decoded.sbu_id;
        } 
        catch (error) {
            try {
                var decoded =  jwt.verify(token,keys.secretOrKeyAdvisors)      
                 itemId = request.query.user
            } catch (error) {
                response.json({notAllowed:"notAllowed"});
                response.send()
            }
        }          


        dbCollection.findOne({ sbu_id: itemId}, (error, result) => {
            if (error) throw error;
            response.json(result);
        });
    });

    //Update a studetns course plan. This request comes from the backend  when we create a new course plan for a student
    router.post("/updateStudentCoursePlan", (request, response) => {
        dbCollection.updateOne({ sbu_id: request.body.sbu_id}, { $set : {coursePlan: request.body.coursePlan }  }, (error, result) => {
            if (error) throw error;
            // send back entire updated list, to make sure frontend data is up-to-date
            dbCollection.find().toArray(function(_error, _result) {
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });
    
    //update students
    router.put("/updateStudent", (request, response) => {
        var token  = (request.cookies.token)
        try {
            var decoded =  jwt.verify(token,keys.secretOrKeyStudents)
             var itemId = decoded.sbu_id;
             console.log(itemId)

        } 
        catch (error) {
            try {
                var decoded =  jwt.verify(token,keys.secretOrKeyAdvisors)      
                var itemId  =  request.query.user
            
            } catch (error) {
                response.json({notAllowed:"notAllowed"});
                response.send()
            } 
        }
        const item = request.body;

        dbCollection.updateOne({ sbu_id: itemId }, { $set: item }, (error, result) => {
            if (error) throw error;
            // send back entire updated list, to make sure frontend data is up-to-date
            dbCollection.find().toArray(function(_error, _result) {
                if (_error) throw _error;
                response.json(_result);
            });
        });
        
    });
    router.get("/", (request, response) => {
    
        
    });
   
}, function(err) { // failureCallback
    throw (err);
});

module.exports = router