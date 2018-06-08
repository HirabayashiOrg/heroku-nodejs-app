var MongoClient = require('mongodb').MongoClient;
const HOST = process.env['heroku.mongodb.host'];
const PORT = process.env['heroku.mongodb.port'] || 5000;
const USER = process.env['heroku.mongodb.user'];
const PASS = process.env['heroku.mongodb.password'];
const DB = process.env['heroku.mongodb.db'];

// DB接続URLを定義
var url = 'mongodb://' + USER + ':' + PASS + '@' + HOST + ':' + PORT + '/' + DB;
console.log({url: url});

// MongoDBに接続
MongoClient.connect(url, function(err, client){
	if(err){
		return console.dir(err);
	}
	// 接続できたことを確認
	console.log("connect to db");

	// DB名を指定してDBオブジェクトを取得
	db = client.db('heroku_bx0lvq0g');

	// コレクション作成
	collection = db.collection("users");

//	// ドキュメントを定義
//	var docs = [
//		{id: 1, name: "ryo"},
//		{id: 2, name: "emi"},
//		{id: 3, name: "ru-"}
//	];
//
//	// 作成したドキュメントをINSERT
//	collection.insert(docs, function(err, result){
//		console.dir(result);
//	});
	// 全件取得
	collection.find().toArray(function(err, items){
		console.log(items);
	});

	// DB接続 切断
	client.close();
});

