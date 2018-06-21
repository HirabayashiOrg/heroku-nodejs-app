var MongoClient = require('mongodb').MongoClient;

exports.connect = function(req, res){
	// 接続先の定義
	var url = "mongodb://hirabayashi:myy623326@ds153460.mlab.com:53460/heroku_bx0lvq0g";
	// 接続
	MongoClient.connect(url, function(err, client){
		if(err){
			res.send(err);
		}else{
			res.send("connect to db");
		}

		// DB接続 切断
		client.close();
	});
};

exports.collections = function(req, res){
	// 接続先の定義
	var url = "mongodb://hirabayashi:myy623326@ds153460.mlab.com:53460/heroku_bx0lvq0g";
	// 接続
	MongoClient.connect(url, function(err, client){
		if(err){
			res.send(err);
		}else{
			// DB名を指定してDBオブジェクトを取得
			db = client.db('heroku_bx0lvq0g');
			db.collections(function(err, collections){
				if(err){
					console.log('err:' + err);
					res.send(err);
				}else{
					var lists = [];
					for(let collection of collections){
						console.log(collection.s.name);
						lists.push(collection.s.name);
					}
					res.render('mongodb/collections', {lists:lists});
				}
			});
		}
		// DB接続 切断
		client.close();
	});
};

exports.collection_json = function(req, res){
	// 接続先の定義
	var url = "mongodb://hirabayashi:myy623326@ds153460.mlab.com:53460/heroku_bx0lvq0g";
	// 接続
	MongoClient.connect(url, function(err, client){
		if(err){
			res.send(err);
		}else{
			// DB名を指定してDBオブジェクトを取得
			db = client.db('heroku_bx0lvq0g');
			collection = db.collection(req.params.collection);
			// コレクションからドキュメントを取得
			// 全件取得
			collection.find().toArray(function(err, items){
				console.log(items);
				res.send(items);
			});
		}
		// DB接続 切断
		client.close();
	});
};
exports.collection_ui = function(req, res){
	// 接続先の定義
	var url = "mongodb://hirabayashi:myy623326@ds153460.mlab.com:53460/heroku_bx0lvq0g";
	// 接続
	MongoClient.connect(url, function(err, client){
		if(err){
			res.send(err);
		}else{
			// DB名を指定してDBオブジェクトを取得
			db = client.db('heroku_bx0lvq0g');
			collection = db.collection(req.params.collection);
			// コレクションからドキュメントを取得
			// 全件取得
			collection.find().toArray(function(err, items){
				console.log(items);
				res.render('mongodb/documents', {items: items});
			});
		}
		// DB接続 切断
		client.close();
	});
};
