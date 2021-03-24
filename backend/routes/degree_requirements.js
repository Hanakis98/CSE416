const express = require("express");
const { ObjectID } = require("mongodb");
const router = express.Router();
const db = require("../database.js");
const dbName = "CSE416";
const collectionName = "degreeRequirements";


db.initialize(dbName, collectionName, function (dbCollection) { // successCallback

    router.get("/allDegreeRequriements", (request, response) => { // get ALL
        // return updated list
        dbCollection.find().toArray((error, result) => {
            if (error) throw error;
            response.json(result);
        });
    });

    router.post("/addDegreeRequriements", (request, response) => {
        const degreeRequriement =  request.body;
        dbCollection.insertOne(degreeRequriement, (error, result) => { // callback of insertOne
            if (error) throw error;
            // return updated list
            dbCollection.find().toArray((_error, _result) => { // callback of find
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });

    router.delete("/deleteDegreeRequirements", (request, response) => {
        const degreeRequriementID = request.body.id;
        console.log("Delete item with id: ", degreeRequriementID);
        dbCollection.deleteOne({ _id: ObjectID(degreeRequriementID) }, function(error, result) {
            if (error) throw error;
            // send back entire updated list after successful request
            dbCollection.find().toArray(function(_error, _result) {
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });


    router.delete("/deleteAllDegreeRequriements/", (request, response) => {
      
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