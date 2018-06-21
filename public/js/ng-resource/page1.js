angular.module('myapp', ['ngResource'])
	.controller('myctrl', ['$scope', '$resource', function($scope, $resource){
		var User = $resource('/ngResource/api/users/:id',{
			id: '@id'
		}, {
			   get: {method: 'GET', isArray: true},
			create: {method: 'POST'},
			   del: {method: 'POST'},
		});
		$scope.users = User.get();

		// 新規作成
		$scope.create = function(){
			//alert(JSON.stringify($scope.user));
			User.create($scope.user, function(user){
				$scope.users.push(user);
			});
			$scope.user = {};
		};

		// 削除
		$scope.del = function(id){
			//alert(id);
			User.del({id: id}, function(result){
				$scope.users = User.get();
			});
		}
	}]);
