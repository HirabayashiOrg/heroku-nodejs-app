angular.module('myapp', [])
	.controller('mainCtrl', [
		'$scope',
		function($scope) {
			// $scope.result = 'sample';
			var talks = [];
			$scope.talk = function(){
				var text = $scope.text;
				if(text.length>1){
					$.get('/talkapi/api/talk', {text: text}, function(data){
						alert(data);
						talks.push(text);
						talks.push(data);
						$scope.talks = talks;
						$scope.reply = data;
					});
				}
			};
		}
	]);