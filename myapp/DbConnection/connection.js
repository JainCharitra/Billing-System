var connection = module.exports;

connection.config = {
	host : 'localhost',
	port : 27017,
	db_name : 'billingSystem'
};
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://' + connection.config.host + ':' + connection.config.port;
var dbConnection;

connection.init = function init() {
	console.log(url);
	MongoClient.connect(url, function(err, client) {
		if (err) {
			console.log('Not Created!');
			// callback(err)
		} else {
			// callback(null);
			dbConnection = client;
			console.log('Database Created!');
		}
	});
};

connection.getDb = function getDb(dbName = connection.config.db_name){
	// if(dbConnection){
		return dbConnection.db(dbName);
	// }
}

connection.close_db = function close_db(){
	if(dbConnection.db){
		dbConnection.db.close();
	}
};


