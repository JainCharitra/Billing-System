const connection = require('./connection.js');
const db = connection.getDb;
// var index = require('../routes/index');
//var dbName = "";
var queries = module.exports;

// queries.setProject = function (data,cb) {
// 	console.log(data);
// 	if(data.projectName){
// 		connection.config.db_name = data.projectName;
// 		connection.init(function () {
// 			/* body... */
// 		// cb(connection.config.db_name);
// 		});
// 	}//else{
// 		cb(connection.config.db_name);
// 	//}
// };

// queries.getProjectList = function (data,cb) {
// 	db().admin().listDatabases({nameOnly:true}, function (err, result) {
// 		console.log(result.databases)
// 		cb(null,result.databases)
// 	})
// 	// db.getMongo().getDBNames( function (err,result) {
// 	// 	cb(err,result);	
// 	// })
// 	// db.adminCommand( { listDatabases: 1, nameOnly: true}, function (err,result) {
// 	// 	cb(err,result);	
// 	// })
// 	 // cb(null,[1,2,3,4,5,6,'temp'])
// }

// queries.saveEntry = function(data,cb){
// 	dbName = data.dbName || connection.config.dbName;
// 	db(dbName).collection('entries').insert(data.query,function (err,res) {
// 		cb(err,res);
// 	});
// };

queries.saveCsv = function(data,cb){
	db().collection('entries').insertMany(data, function (err,result) {

	//db().collection('entries').update({"no":data.no}, {data}, { upsert : true, multi : true }, function (err,result) {
	 cb(err,result) 
	});
};

// queries.total = function(data,cb){
// 	dbName = data.dbName || connection.config.dbName;
// 	db(dbName).collection('totals').update({ section : data.query.section }, {$inc:{ size : data.query.size, time : data.query.time}}, { upsert : true }, function (err,result) {
// 	 cb(err,result) 
// 	});
// };

queries.getEntry = function(data,cb){
	db().collection('entries').find({ $and: [ { "_id": { $gte: data.challanNumGt } }, { "_id": { $lte: data.challanNumLt } } ] }).toArray(function(err,result)
	{
		cb(err,result);
	});
}

queries.deleteEntriesCollection = function (cb) {
	db().collection('entries').drop(function (err,result) {
		//console.log("delete collection event: ",err,result);
		cb(err,result);
	})
}

// queries.getSection = function (cb) {
// 	db().collection('entries').distinct('section',function (err,result) {
// 		cb(err,result);
// 	})
// }


// queries.getTotal = function (data,cb) {
// 	db().collection('totals').findOne(data.filter,data.projection,function (err,result) {
// 		cb(err,result);
// 	})
// }