//Connection to Mongo
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const uri = 'mongodb+srv://ted:$[rfYMsIXkluwYrYaA]@cse416.23kfi.mongodb.net/CSE416?retryWrites=true';
const dbName = "CSE416"

const mongoose = require("mongoose")

mongoose.connect(uri, {  useNewUrlParser: true })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));


  var db = mongoose.connection; 