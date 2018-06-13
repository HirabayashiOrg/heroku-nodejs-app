var DocomoAPI = require('docomo-api');
var api_key = '652e514876652e33635365327749336859686f4d54554547754e78542f2e424173493457594b6277526c2e'
var api = new DocomoAPI(api_key);

// Without user parameters
api.createDialogue('Hello', function(error, data){
	if(error){
		console.log(error);
	}else{
		console.log(data.utt);
	}
});

// With user parameters
var params = {
  "nickname": "光",
  "nickname_y": "ヒカリ",
  "sex": "女",
  "bloodtype": "B",
  "birthdateY": "1997",
  "birthdateM": "5",
  "birthdateD": "30",
  "age": "16",
  "constellations": "双子座",
  "place": "東京"
};

api.createDialogue('Hello', params, function(error, data){
	if(error){
		console.log(error);
	}else{
		console.log(data.utt);
	}
});