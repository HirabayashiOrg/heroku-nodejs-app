const express = require('express');
const path = require('path');
const PORT = process.env.heroku_webapp_port || 5000;
// アプリ生成
var app = express();

// 静的フォルダの指定
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
