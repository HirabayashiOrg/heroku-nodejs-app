const express = require('express');
const path = require('path');

const HOST = process.env['heroku.mongodb.host'];
const PORT = process.env['heroku.mongodb.port'] || 5000;
const USER = process.env['heroku.mongodb.user'];
const PASS = process.env['heroku.mongodb.password'];

// アプリ生成
var app = express();

// 静的フォルダの指定
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
