const MongoClient = require('mongodb').MongoClient;

const test = require('assert');

// Connection url

const uri = 'mongodb+srv://ted:<rfYMsIXkluwYrYaA>@cse416.23kfi.mongodb.net/CSE416?retryWrites=true&w=majority';

// Database Name
const dbName = "CSE416"

const client = new MongoClient(uri);



function initialize(dbName, dbCollectionName, successCallback, failureCallback){
try{
   client.connect();

  const db = client.db(dbName)
  const col = db.collection(dbCollectionName)
  const doc =  col.find()

  console.log(doc)
}
  catch (err) {

    console.log(err.stack);

  }



  finally {

   client.close();

}
}
module.exports = {
  initialize
};