var xmlrpc = require('xmlrpc');

var client = xmlrpc.createClient({
	host: 'd.hatena.ne.jp',
	path: '/xmlrpc'
});

client.methodCall('hatena.getSimilarWord', {"wordlist":['サッカー']}, function(err, value){
	if(err){
		console.log(err);
	}else{
		console.log(value);
	}
});