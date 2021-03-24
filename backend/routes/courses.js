const express = require("express");
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
    
   
}, function(err) { // failureCallback
    throw (err);
});

module.exports = router