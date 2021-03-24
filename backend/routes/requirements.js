const express = require("express");
const { ObjectID } = require("mongodb");
const router = express.Router();
const db = require("../database.js");
const dbName = "CSE416";
const collectionName = "Requirements";


db.initialize(dbName, collectionName, function (dbCollection) { // successCallback

    router.get("/allRequirements", (request, response) => {
        // return updated list
        dbCollection.find().toArray((error, result) => {
            if (error) throw error;
            response.json(result);
        });
    });

    router.post("/addRequirement", (request, response) => {
        const requirementItem = request.body;
        // return updated list
        dbCollection.insertOne(requirementItem, (error, result) => { // callback of insertOne
            if (error) throw error;
            // return updated list
            dbCollection.find().toArray((_error, _result) => { // callback of find
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });

    router.delete("/deleteRequirement", (request, response) => {
        const requirementObjectID = request.body.id;
        console.log("Delete item with id: ", requirementObjectID);
        dbCollection.deleteOne({ _id: ObjectID(requirementObjectID) }, function(error, result) {
            if (error) throw error;
            // send back entire updated list after successful request
            dbCollection.find().toArray(function(_error, _result) {
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });

    router.delete("/deleteAllRequirements", (request, response) => {
      
        console.log("Delete All Requirements");
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