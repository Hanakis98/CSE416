const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const server = express();

const body_parser = require("body-parser");
server.use(body_parser.json());
const port = 4000;
const test = require('assert');
// Connection url
const uri = 'mongodb+srv://ted:<rfYMsIXkluwYrYaA>@cse416.23kfi.mongodb.net/CSE416?retryWrites=true&w=majority';
// Database Name
const collectionName = "CSE416"
const dbName = "CSE416"


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, keepAlive: 1 });

server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});

client.connect(err => {
   const collection = client.db(dbName).collection(collectionName);
    // perform actions on the collection object
    collection.find().toArray();
    console.log('connected');


});