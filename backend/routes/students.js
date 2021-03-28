const { request } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../database.js");
const studentSchema = require("../models/studentModel.js");
const dbName = "CSE416";
const collectionName = "Users";
const studentModel = require("../models/studentModel.js");

db.initialize(dbName, collectionName, function (dbCollection) { // successCallback

    router.get("/allStudents", (request, response) => { // get ALL
        // return updated list
        dbCollection.find().toArray((error, result) => {
            if (error) throw error;
            response.json(result);
        });
    });

    router.post("/addStudent", (request, response) => {
        var newStudent = new studentModel({
            first_name : request.body.first_name,
            last_name : request.body.last_name,
            sbu_id : request.body.sbu_id
        })

        newStudent.save(function(err, doc) {
            if (err) return console.error(err);
            console.log("Document inserted succussfully!");
          });
        console.log(newStudent.sbu_id)

        // const item =  request.body
        // dbCollection.insertOne(item, (error, result) => { // callback of insertOne
        //     if (error) throw error;
        //     // return updated list
        //     dbCollection.find().toArray((_error, _result) => { // callback of find
        //         if (_error) throw _error;
        //         response.json(_result);
        //     });
        // });
        // response.redirect("http://localhost:3000/students")
    });

    router.delete("/deleteStudent", (request, response) => {
        console.log(request.body.sbu_id)
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