angular.module('myapp', ['ngResource'])
	.controller('myctrl', ['$scope', '$resource', function($scope, $resource){
		var User = $resource('/ngResource/api/users/:id',{
			id: '@id'
		}, {
			   get: {method: 'GET', isArray: true},
			create: {method: 'POST'},
			   del: {method: 'POST'},
		});
		var UserEditer = $resource('/ngResource/api/users/edit',{
			id: '@id'
		}, {
			  edit: {method: 'POST'},
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
			for(var i=0; i<$scope.users.length; i++){
				if($scope.users[i]._id == id){
					$scope.users.splice(i, 1);
				}
			}
			User.del({id: id}, function(result){});
		};

		// 編集
		$scope.edit = function(user){
			//alert(JSON.stringify(user));
			UserEditer.edit({user:user}, function(result){
				$scope.result = result;
			});
		};
	}]);
