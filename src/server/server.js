const express = require("express");
const server = express();

const body_parser = require("body-parser");

// parse JSON (application/json content-type)
server.use(body_parser.json());

const port = 4000;

// << db setup >>
const db = require("./db");
const dbName = "CSE416";
const collectionName = "Users";

db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
   // get all items
   dbCollection.find().toArray(function (err, result) {
      if (err) throw err;
      console.log(result);

      // << return response to client >>
    });
}, function(err) { // failureCallback
    throw (err);
});