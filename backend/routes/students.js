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
var sha = require("sha1")
const cookieParser = require("cookie-parser");
db.initialize(dbName, collectionName, function (dbCollection) { // successCallback

    router.post("/login", (req, res) => {
        const username1 = req.body.username;
        const providedPassword1 = sha(req.body.password );

        //if user doesnt exist
        if(  dbCollection.findOne({ username:username1,password:providedPassword1}) == null){
          res.cookie("token",  false ,{ maxage:300, httpOnly: true , withCredentials: true,path:"/" });
          res.cookie("studentLoggedIn",0,{ maxage:300, httpOnly: false ,path:"/" });
          res.cookie("gpdLoggedIn",0,{ maxage:300, httpOnly: false ,path:"/" });

          res.send();
          return
        }
 
          // Check if user exists
          // Check password    
          dbCollection.findOne({ username:username1,password:providedPassword1}).then(user => {
          if(user == null){
            res.statusCode=400
            res.cookie("token",  false ,{ maxage:300, httpOnly: true , withCredentials: true,path:"/" });
            res.cookie("studentLoggedIn",0,{ maxage:300, httpOnly: false ,path:"/" });
            res.cookie("gpdLoggedIn",0,{ maxage:300, httpOnly: false ,path:"/" });

            res.send();
          }
         
              // User matched
              // Create JWT Payload
              const payload = {
                username: username1,
                typeOf: "student"
              };// Sign token

              jwt.sign(
                payload,
                keys.secretOrKeyStudents,
                {
                  expiresIn: 300 // 5 min in seconds
                },
                (err, token) => {
                    if(!err)
                    {

                        res.cookie("token",  token ,{ maxage:1000*1000, httpOnly: true , withCredentials: true,path:"/" });
                        res.cookie("studentLoggedIn",1,{ maxage:1000*1000, httpOnly: false ,path:"/" });
                        res.cookie("gpdLoggedIn",0,{ maxage:300, httpOnly: false ,path:"/" });

                        res.send();
                      
                    }
                    
                }
              );
           });





      });
      

    router.get("/allStudents", (request, response) => { // get ALL
        // return updated list
        var token  = (request.cookies.token)
        // startLocation=request.headers.cookie.substring(request.headers.cookie.indexOf("token=")+6);;
        // if(startLocation,request.headers.cookie.substring(startLocation,request.headers.cookie.indexOf(";") !=-1))
        //     token =  (startLocation,request.headers.cookie.substring(startLocation,request.headers.cookie.indexOf(";",startLocation) ));
        // else
        //     token =  (startLocation,request.headers.cookie.substring(startLocation));

      
        console.log(token)

        console.log( jwt.verify(token,keys.secretOrKeyAdvisors))

        dbCollection.find().toArray((error, result) => {
            if (error) throw error;
            response.json(result);
        });
    });

    router.post("/addStudent", (request, response) => {
        var token  = (request.cookies.token)

        console.log( jwt.verify(token,keys.secretOrKeyAdvisors))
     
    //   console.log(  jwt.verify(request.body.cookies,"MySecretKey!!!!"))
        var newStudent = new studentModel({
            first_name : request.body.first_name,
            last_name : request.body.last_name,
            username : request.body.username,
            password : request.body.password,
            sbu_id : request.body.sbu_id,
            email: request.body.email,
            department:  request.body.department,
            track: request.body.track
        })

        newStudent.save(function(err, doc) {
            if (err) return console.error(err);
            dbCollection.find().toArray((_error, _result) => { // callback of find
                if (_error) throw _error;
                response.json(_result);
            });    });

     
    });

    router.delete("/deleteStudent", (request, response) => {

        var token  = (request.cookies.token)

        console.log( jwt.verify(token,keys.secretOrKeyAdvisors))

    //    studentModel.find({sbu_id : request.body.sbu_id}, function (err, docs) {
    //     }).remove()

    //     response.json()
        const itemId = request.body.sbu_id;
        console.log("Delete item with id: ", itemId);
        dbCollection.deleteOne({ sbu_id: itemId }, function(error, result) {
            if (error) throw error;
            // send back entire updated list after successful request
            dbCollection.find().toArray(function(_error, _result) {
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });


    router.delete("/deleteAllStudent/", (request, response) => {
        var token  = (request.cookies.token)

        console.log( jwt.verify(token,keys.secretOrKeyAdvisors))

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

    router.get("/student", (request, response) => {
        const itemId = request.headers.id;
        dbCollection.findOne({ id: itemId }, (error, result) => {
            if (error) throw error;
            // return item
            response.json(result);
        });
    });
    
    router.put("/updateStudent", (request, response) => {
        const itemId = request.headers.id
        const item = request.body;
        console.log("Editing item: ", itemId, " to be ", item);
        dbCollection.updateOne({ id: itemId }, { $set: item }, (error, result) => {
            if (error) throw error;
            // send back entire updated list, to make sure frontend data is up-to-date
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