var http = require('request');

var parse = require('xmljson').to_json;

var options = {
	url : 'http://kizasi.jp/kizapi.py?type=rank',
};

exports.rankingAPI = function(req, res) {
	http.get(options, function(err, response, body) {
	//	console.log(body);
		parse(body, function(err, data) {
			if(err){
				console.log(err);
			}else{
				var items = data.rss.channel.item;
				//console.log(items);
				var data = {data: []}
				for(var key in items){
					//console.log(items[key].title);
					data['data'].push(items[key].title);
				}
				//console.log(data);
				res.send(data);
			}
		});
	});
};

exports.rankingUI = function(req, res) {
	http.get(options, function(err, response, body) {
	//	console.log(body);
		parse(body, function(err, data) {
			if(err){
				console.log(err);
			}else{
				var items = data.rss.channel.item;
				//console.log(items);
				var data = {data: []}
				for(var key in items){
					//console.log(items[key].title);
					data['data'].push(items[key].title);
				}
				//console.log(data);
				res.render('kizapi/ranking',data);
			}
		});
	});
};

exports.reration = function(req, res) {
	var parse = require('xmljson').to_json;
	var options = {
		url : 'http://kizasi.jp/kizapi.py?span=24&kw_expr=' + encodeURIComponent(req.query.word) + '&type=coll',
	};

	http.get(options, function(err, response, body) {
		if(err){
			console.log(err);
		}else{
			//console.log(body);
			parse(body, function(err, data) {
				if(err){
					console.log(err);
				}else{
					var items = data.rss.channel.item;
					var data = {data: []}
					//console.log(items);
					for(var key in items) {
						data.data.push(items[key].title);
					}
					res.render('kizapi/reration', data);
				}
			});
		}
	});
}