const express = require('express');

const server = express();

const body_parser = require("body-parser");

server.use(body_parser.json());

const port = 4000;

const db = require('./db')

// Database Name
const dbName = "CSE416"
const collectionName = "sample_analytics"

server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});

db.initialize(dbName, collectionName, function(collection) { // successCallback
   x = collection.find()
    console.log (x.toArray());

}, function(err) { // failureCallback
    throw (err);
});