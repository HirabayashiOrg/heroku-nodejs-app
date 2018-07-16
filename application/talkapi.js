var http = require('request');


exports.talk = function(req, res) {
	var apikey = 'DZZFiEoyHKBtWdfi5XSdtujpOnQkpWEs';
	var options = {
			url : 'https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk',
			form: {
				apikey: apikey,
				query : req.query.text,
			},
			json: true,
	};
	http.post(options, function(err, response, body) {
		if(body.results.length >= 1){
			res.send(body.results[0].reply);
		}else{
			res.send('error...');
		}
	});
};
