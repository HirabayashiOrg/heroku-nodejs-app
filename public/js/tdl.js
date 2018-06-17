angular.module('myapp', ['ngStorage'])
	.controller('myctrl', ['$scope', '$localStorage', function($scope, $localStorage) {
		// ストレージをローカルストレージに設定
		$scope.$strage = $localStorage;

		// タスク一覧にストレージの内容を反映
		$scope.tasks = $scope.$strage.tasks || [];

		$scope.add = function(){
			if($scope.newTask.length!=0){
				$scope.tasks.push({'body':$scope.newTask, 'active': true});
				$scope.newTask = '';
			}
			$scope.save();
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
			$scope.save();
		};
		$scope.save = function(){
			$scope.$strage.tasks = $scope.tasks;
		}
	}]);