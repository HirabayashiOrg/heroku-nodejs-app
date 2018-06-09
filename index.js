const express = require('express');
const path = require('path');
const PORT = process.env['PORT'] || 5000;
// body部の解析
var bodyParser = require('body-parser');
var qs = require('querystring');
require('date-utils');
// DB接続関係
var MongoClient = require('mongodb').MongoClient;
const HOST = process.env['heroku.mongodb.host'];
const PORT_DB = process.env['heroku.mongodb.port'] || 5000;
const USER = process.env['heroku.mongodb.user'];
const PASS = process.env['heroku.mongodb.password'];
const DB = process.env['heroku.mongodb.db'];

// DB接続
var url = 'mongodb://' + USER + ':' + PASS + '@' + HOST + ':' + PORT_DB + '/' + DB;
MongoClient.connect(url, function(err, client){
	if(err){
		return console.dir(err);
	}
	// 接続できたことを確認
	console.log("connect to db");
	// DB名を指定してDBオブジェクトを取得
	db = client.db('heroku_bx0lvq0g');
	// コレクション作成
	users = db.collection("users");
	bookmarks = db.collection("bookmarks");
});

// アプリ生成
var app = express();

// 静的フォルダの指定
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));

app.get('/api/c_users' , function(req, res){
	var docs = [
		{id: 1, name: "ryo"},
		{id: 2, name: "emi"},
		{id: 3, name: "ru-"}
	];
	res.json(docs);
});

// ユーザ一覧画面
app.get('/users', function(req, res){
	users.find({}, {_id:0}).toArray(function(err, users){
		res.render('user_list_t', {'users':users});
	});
});

// ブックマーク一覧画面
app.get('/bookmark/:user', function(req,res){
	bookmarks.find().toArray(function(err, docs){
		res.render('bookmark/list_t',{'docs':docs});
	});
});
// ブックマーク新規登録
app.post('/bookmark/register', function(req, res){
	console.log('access bookmark/register');
	req.data = "";
	req.on("readable", function(){
		req.data += req.read() || '';
	});
	req.on("end", function(){
		var query = qs.parse(req.data);
		bookmarks.insert({
			user: 'ryo',
			title: query.title,
			url: query.url,
			cc: 0,
			date: new Date().toFormat('YYYYMMDD_HH24MISS')
		}, function(err, result){
			res.send(result);
		});
	});

	//	collection.insert({
//
//	}, function(err, result){})
});

// アプリ開始
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
