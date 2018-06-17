var express = require('express'),
	app = express();
var fs = require('fs');
const PORT = process.env['PORT'] || 5000;


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
//***************************
//** to do list application
//***************************
var docs_file = __dirname + '/other/docs.json';
var docs = {}
fs.readFile(docs_file, 'utf-8', function(err, data){
	if(err){
		console.log(err);
	}else{
		docs = JSON.parse(data);
		//console.log(docs);
	}
});
// ファイル更新用
app.get('/tdl', function(req, res){
	// ステータスが２の要素を抽出
	tdls_new = [];
	for(var i=0; i<docs.tdls.length; i++){
		if(docs.tdls[i].status != 2){
			// 新ToDoリストに追加
			tdls_new.push(docs.tdls[i]);
		}
	}
	// 既存のリストを更新
	docs.tdls = tdls_new;
	// ファイルに書込み
	fs.writeFile(docs_file, JSON.stringify(docs), function(err){
		console.log(err);
	});
	// 一覧画面へリダイレクト
	res.redirect('/tdl/list');
});
// 一覧画面
app.get('/tdl/list', function(req, res){
	res.render('tdl/list', {tdls: docs.tdls});
});
// 入力画面
app.get('/tdl/add', function(req, res){
	res.render('tdl/add');
});
// 要素追加API
app.post('/tdl/add', function(req, res){
	docs.tdls.push({
		task: req.body.task,
		status: 0
	});
	fs.writeFile(docs_file, JSON.stringify(docs), function(err){
		console.log(err);
	});
	res.redirect('/tdl/list');
});
// 要素削除API
app.post('/tdl/delete', function(req, res){
	var idx = req.body.index;
	docs.tdls[idx].status = 2;
	//console.log(docs);
	fs.writeFile(docs_file, JSON.stringify(docs), function(err){
		console.log(err);
	});
});
app.post('/tdl/deleteAll', function(req, res){
	// 新リスト生成
	var tdls_new = [];
	// ステータスが0の要素のみ抽出
	for(var i=0; i<docs.tdls.length; i++){
		if(docs.tdls[i].status==0){
			tdls_new.push(docs.tdls[i]);
		}
	}
	// 既存のリストを更新
	docs.tdls = tdls_new;
	// ファイルを更新
	fs.writeFile(docs_file, JSON.stringify(docs), function(err){
		console.log(err);
	});
});
// ステータス更新API
app.post('/tdl/update', function(req, res){
	var idx = req.body.index;
	docs.tdls[idx].status = (docs.tdls[idx].status + 1) % 2;
	fs.writeFile(docs_file, JSON.stringify(docs), function(err){
		console.log(err);
	});
});

//アプリ開始
app.listen(PORT, () => console.log(`Listening on localhost:${ PORT }`));