angular.module('myapp', ['ngResource'])
	.controller('myctrl', ['$scope', '$resource', '$http', function($scope, $resource, $http) {
//		var $url = 'http://localhost/php/xrea/php/bookmark/list.php';
		var $url = '/data/bookmarks.json';

		$scope.bookmarks = [];
		$scope.add = function(){
			$scope.bookmarks.push($scope.bookmark);
			$scope.bookmark = '';
		};

		$http.get($url).then(function(res){
			for(var i=0; i<res.data.length; i++){
				$scope.bookmarks.push(res.data[i]);
			}
		});
	}]);