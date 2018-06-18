angular.module('myapp', ['ngStorage'])
	.controller('myctrl', ['$scope', '$localStorage', function($scope, $localStorage) {
		// ストレージをローカルストレージに設定
//		$localStorage = [];
		$scope.$strage = $localStorage;
		// タスク一覧にストレージの内容を反映
		$scope.bookmarks = $scope.$strage.bookmarks || [{
			title  :'ToDoリスト',
			url    : 'https://hira-nodejs-app.herokuapp.com/tdl.html',
			cc     : 0,
			created: '201806180000',
			updated: '201806180000',
			status : 0
		}];

		// クリックカウントアップ・時刻更新
		$scope.update = function(url){
			for(var i=0; i<$scope.bookmarks.length; i++){
				if($scope.bookmarks[i].url==url){
					// カウントアップ
					$scope.bookmarks[i].cc++;
					// 時刻更新
					var now = new Date();
					var datetime = "" + now.getFullYear();
					datetime += ("00" + (now.getMonth() + 1)).slice(-2);
					datetime += ("00" + now.getDate()).slice(-2);
					datetime += ("00" + now.getHours()).slice(-2);
					datetime += ("00" + now.getMinutes()).slice(-2);
					$scope.bookmarks[i].updated = datetime;

					break;
				}
			}

			$scope.save();
		};
		// ブックマークの追加
		$scope.add = function(){
			if($scope.url.length != 0 && $scope.title.length != 0){
				// 日付を取得
				var now = new Date();
				var datetime = "" + now.getFullYear();
				datetime += ("00" + (now.getMonth() + 1)).slice(-2);
				datetime += ("00" + now.getDate()).slice(-2);
				datetime += ("00" + now.getHours()).slice(-2);
				datetime += ("00" + now.getMinutes()).slice(-2);
				// ブックマークに入力内容を追加
				$scope.bookmarks.push({
					title   : $scope.title,
					url     : $scope.url  ,
					cc      : 0           ,
					created : datetime    ,
					updated : datetime    ,
					status  : 0
				});
				$scope.url = '';
				$scope.title = '';
			}

			$scope.save();
		}
		// ブックマークの削除
		$scope.remove = function(url){
			for(var i=0; i<$scope.bookmarks.length; i++){
				if($scope.bookmarks[i].url==url){
					$scope.bookmarks.splice(i, 1);
					break;
				}
			}
			return false;
		}

		// ストレージに保存
		$scope.save = function(){
			$scope.$strage.bookmarks = $scope.bookmarks;
		};
	}]);

