const express = require("express");
const router = express.Router();
const db = require("../database");
const dbName = "CSE416";
const collectionName = "Advisors";


db.initialize(dbName, collectionName, function (dbCollection) { // successCallback

    router.get("/allGPDs", (request, response) => {
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