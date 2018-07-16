var http = require('request');

var parse = require('xmljson').to_json;

var options = {
	url : 'http://kizasi.jp/kizapi.py?span=24&kw_expr=' + encodeURIComponent('サッカー') + '&type=coll',
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
				console.log(data);
			}
		});
	}
});
