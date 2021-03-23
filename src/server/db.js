const MongoClient = require('mongodb').MongoClient;

const test = require('assert');

// Connection url

const uri = 'mongodb+srv://ted:<rfYMsIXkluwYrYaA>@cse416.23kfi.mongodb.net/CSE416?retryWrites=true&w=majority';

// Database Name
const dbName = "CSE416"

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, keepAlive: 1 });



function initialize(dbName, dbCollectionName, successCallback, failureCallback){

  client.connect(err => {
    const database = client.db(dbName)
    const collection = database.collection(dbCollectionName)
    
    successCallback(collection)
    client.close()
  }); 

}

module.exports = {
  initialize
};