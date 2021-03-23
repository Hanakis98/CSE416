// import and use mongodb.MongoClient
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const dbConnectionUrl = 'mongodb+srv://ted:123@cse416.23kfi.mongodb.net/CSE416?retryWrites=true&w=majority'; 

function initialize(dbName, dbCollectionName, successCallback, failureCallback) {
  const client = new MongoClient(dbConnectionUrl, { useNewUrlParser: true, useUnifiedTopology: true });
	client.connect(function (err, dbInstance) {
		if (err) {
			console.log(`[MongoDB connection] ERROR: ${err}`);
			failureCallback(err);        // this should be "caught" by the calling function
		} else {
			const dbObject = dbInstance.db(dbName);
			const dbCollection = dbObject.collection(dbCollectionName);

			console.log("[MongoDB connection] SUCCESS");
			successCallback(dbCollection);
		}
	});
}

module.exports = { initialize };