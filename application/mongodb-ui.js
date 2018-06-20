var MongoClient = require('mongodb').MongoClient;

exports.connect = function(req, res){
	// 接続先の定義
	var url = "mongodb://hirabayashi:hirabayashi@ds153460.mlab.com:53460/heroku_bx0lvq0g";
	// 接続
	MongoClient.connect(url, function(err, client){
		if(err){
			res.send(err);
		}else{
			res.send("connect to db");
		}
	});
};