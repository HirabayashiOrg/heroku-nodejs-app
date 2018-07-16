angular.module('myapp', [])
	.controller('mainCtrl', [
		'$scope',
		function($scope) {
			$scope.summary = function(){
				var text  = $scope.text;
				var count = $scope.count;
				if(text.length>=1){
					$.get('/summary/api/summary', {
						text: text,
						count: count
					}, function(data){
						// alert(data);
						$scope.reply = JSON.stringify(data);
					});
				}
			};
			return false;
		}
	]);