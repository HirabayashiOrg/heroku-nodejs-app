var MongoClient = require('mongodb').MongoClient;
// タスクリスト一覧画面
exports.list = function(req, res) {
	var name = req.params.name;

	res.render('todo_react/list', {name: name});
}
// タスクリストAPI
exports.api_list = function(req, res){
	// 接続先の定義
	var url = "mongodb://hirabayashi:myy623326@ds153460.mlab.com:53460/heroku_bx0lvq0g";
	// 接続
	MongoClient.connect(url, function(err, client){
		if(err){
			res.send(err);
		}else{
			// DB名を指定してDBオブジェクトを取得
			db = client.db('heroku_bx0lvq0g');
			// コレクションを指定
			collection = db.collection("todolist");
			// ドキュメントを取得
			collection.aggregate([
				{$project: {_id: 0}}
			]).toArray((err, docs) => {
				res.send(docs);
			});
		}
		// DB接続 切断
		client.close();
	});
};
// タスク登録API
exports.api_reg = function(req, res){
	// 接続先の定義
	var url = "mongodb://hirabayashi:myy623326@ds153460.mlab.com:53460/heroku_bx0lvq0g";
	// 接続
	MongoClient.connect(url, function(err, client){
		if(err){
			res.send(err);
		}else{
			// DB名を指定してDBオブジェクトを取得
			db = client.db('heroku_bx0lvq0g');
			// コレクションを指定
			collection = db.collection("todolist");
			// 登録タスク取得
			var task = req.body;
			// タスク登録
			collection.insert(task, function(err, result) {
				if(err) {
					res.send(err);
				} else {
					res.send(result);
				}
			});
		}
		// DB接続 切断
		client.close();
	});
};
//タスク削除API
exports.api_del = function(req, res){
	// 接続先の定義
	var url = "mongodb://hirabayashi:myy623326@ds153460.mlab.com:53460/heroku_bx0lvq0g";
	// 接続
	MongoClient.connect(url, function(err, client){
		if(err){
			res.send(err);
		}else{
			// DB名を指定してDBオブジェクトを取得
			db = client.db('heroku_bx0lvq0g');
			// コレクションを指定
			collection = db.collection("todolist");
			// 登録タスク取得
			var task = req.body;
			// タスク登録
			collection.insert(task, function(err, result) {
				if(err) {
					res.send(err);
				} else {
					res.send(result);
				}
			});
		}
		// DB接続 切断
		client.close();
	});
};
