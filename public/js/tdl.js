angular.module('myapp', ['ngStorage'])
	.controller('myctrl', ['$scope', '$localStorage', function($scope, $localStorage) {
		$scope.tasks = [
			{'body': 'task1', 'active':true},
			{'body': 'task2', 'active':true},
			{'body': 'task3', 'active':false},
		];
		$scope.add = function(){
			if($scope.newTask.length!=0){
				$scope.tasks.push({'body':$scope.newTask, 'active': true});
				$scope.newTask = '';
			}
		};
		$scope.getCount = function(){
			var count = 0;
			for(var i = 0; i < $scope.tasks.length; i++){
				if($scope.tasks[i].active){
					count++;
				}
			}
			return count;
		};
		$scope.bulkDelete = function(){
			// タスク一覧を退避
			var oldTasks = $scope.tasks;
			// タスク一覧をクリア
			$scope.tasks = [];
			angular.forEach(oldTasks, function(task){
				if(task.active){
					$scope.tasks.push(task);
				};
			});
		};
	}]);