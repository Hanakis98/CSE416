const MongoClient = require('mongodb').MongoClient;

const test = require('assert');

// Connection url

const uri = 'mongodb+srv://ted:<rfYMsIXkluwYrYaA>@cse416.23kfi.mongodb.net/CSE416?retryWrites=true&w=majority';

// Database Name
const dbName = "CSE416"

const mongoose = require("mongoose")

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db(dbName).listCollections()
  console.log(collection)
  client.close();
});