const MongoClient = require('mongodb').MongoClient;

const test = require('assert');

// Connection url

const uri = 'mongodb+srv://ted:<rfYMsIXkluwYrYaA>@cse416.23kfi.mongodb.net/CSE416?retryWrites=true&w=majority';

// Database Name
const dbName = "CSE416"

function initialize(dbName, dbCollectionName, successCallback, failureCallback){

  MongoClient.connect(uri, function(err, dbInstance) {
      if (err){
          console.log('[MongoDB connection] ERROR:')
      } else {

      }

  });

}