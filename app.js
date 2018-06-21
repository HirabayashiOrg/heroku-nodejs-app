var express = require('express'),
	app = express();
var fs = require('fs');
const PORT = process.env['PORT'] || 5000;
var MongoClient = require('mongodb').MongoClient;

// 外部ファイルの読込
var mongo = require('./application/mongodb-ui')

// middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));


//テンプレートエンジンを使用するための設定
//テンプレートの配置場所を設定
app.set('views', __dirname + '/views');
//テンプレートの種類を設定
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.send('This is Express application !!!');
});

// MongoDB UI
app.get('/mongo/connect', mongo.connect);
app.get('/mongo/ui/collections', mongo.collections);
app.get('/mongo/json/collection/:collection', mongo.collection_json);
app.get('/mongo/ui/collection/:collection', mongo.collection_ui);

//アプリ開始
app.listen(PORT, () => console.log(`Listening on localhost:${ PORT }`));