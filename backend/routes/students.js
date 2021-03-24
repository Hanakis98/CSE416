const express = require("express");
const router = express.Router();
const db = require("../database.js");
const dbName = "CSE416";
const collectionName = "Users";


db.initialize(dbName, collectionName, function (dbCollection) { // successCallback

    router.get("/allStudents", (request, response) => {
        // return updated list
        dbCollection.find().toArray((error, result) => {
            if (error) throw error;
            response.json(result);
        });
    });
    
   
}, function(err) { // failureCallback
    throw (err);
});

module.exports = router