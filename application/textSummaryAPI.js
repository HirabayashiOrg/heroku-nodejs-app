var http = require('request');

exports.root = function(req, res){
	res.redirect('/textSummaryAPI/index.html');
};

exports.summary = function(req, res) {
	var apikey = 'DZZLMP1bxEkKaLBd5exTltwY1X6cIWFJ';
	var options = {
			url : 'https://api.a3rt.recruit-tech.co.jp/text_summarization/v1',
			form: {
				apikey    : apikey,
				sentences : req.query.text,
				linenumber: req.query.count || 1,
			},
			json: true,
	};
	http.post(options, function(err, response, body) {
		res.send(body);
		//console.log(body);
	});
};

exports.summary_ui = function(req, res) {
	var apikey = 'DZZLMP1bxEkKaLBd5exTltwY1X6cIWFJ';
	var options = {
			url : 'https://api.a3rt.recruit-tech.co.jp/text_summarization/v1',
			form: {
				apikey    : apikey,
				sentences : req.query.text,
				linenumber: req.query.count || 1,
			},
			json: true,
	};
	http.post(options, function(err, response, body) {
		res.render('textSummaryAPI/main', {body: JSON.stringify(body)});
	});
}