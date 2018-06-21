var MongoClient = require('mongodb').MongoClient;
var     mongodb = require('mongodb');

// ユーザー一覧取得
exports.lists = function(req, res){
	console.log('list');
	// 接続先の定義
	var url = "mongodb://hirabayashi:myy623326@ds153460.mlab.com:53460/heroku_bx0lvq0g";
	// 接続
	MongoClient.connect(url, function(err, client){
		if(err){
			res.send(err);
		}else{
			// DB名を指定してDBオブジェクトを取得
			db = client.db('heroku_bx0lvq0g');
			collection = db.collection('users');
			collection.find().toArray(function(err, users){
				res.send(users);
			});
		}
		// DB接続 切断
		client.close();
	});
};

// 新規作成
exports.create = function(req, res){
	// 接続先の定義
	var url = "mongodb://hirabayashi:myy623326@ds153460.mlab.com:53460/heroku_bx0lvq0g";
	// 接続
	MongoClient.connect(url, function(err, client){
		if(err){
			res.send(err);
		}else{
			// DB名を指定してDBオブジェクトを取得
			db = client.db('heroku_bx0lvq0g');
			collection = db.collection('users');
			var user = {
					name : req.body.name,
					 age : req.body.age,
				}
			collection.insert(user, function(err, result){
				res.send(user);
			});
		}
		// DB接続 切断
		client.close();
	});
};

// 削除
exports.del = function(req, res){
	console.log('del');
	// 接続先の定義
	var url = "mongodb://hirabayashi:myy623326@ds153460.mlab.com:53460/heroku_bx0lvq0g";
	// 接続
	MongoClient.connect(url, function(err, client){
		if(err){
			res.send(err);
		}else{
			// DB名を指定してDBオブジェクトを取得
			db = client.db('heroku_bx0lvq0g');
			collection = db.collection('users');
			collection.remove({id: mongodb.ObjectID(req.body.id)}, function(result){
				res.send('ok');
			});
		}
		// DB接続 切断
		client.close();
	});
};
