var express = require('express');
var router = express.Router();
var queries = require('../DbConnection/queries.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

router.post('/saveData',function(req,res,next){
	//console.log(req.body);
	queries.saveCsv(req.body,function(err,result){
		console.log("saveData",err,result)
		if(err){
			res.json({success:false,info:"Duplicate keys"});
		}else{
			res.json({success:true,result:"inserted"});	
		}
	})
	
});

router.post('/deleteData',function (req,res,next) {
	queries.deleteEntriesCollection(function (err,result) {
		if(err){
			res.json({success:false,info:"false"});
		}else{
			res.json({success:true,result:"deleted"});	
		}
	})
})

router.post('/getDataToPrint',function (req,res,next) {
	queries.getEntry(req.body,function (err,result) {
		if(err){
			res.json({success:false,info:err});
		}else{
			res.json({success:true,result:result});
		}
	})
})

router.get('/printChallan',function(req,res,next){
	
	res.sendFile('printChallan.html');
});

module.exports = router;
