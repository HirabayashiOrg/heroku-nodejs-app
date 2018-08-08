(() => {
	var tasks = [];

	function Form(props) {
		return (
			<form className="form-horizontal" onSubmit={props.register}>
				<div className="form-group">
					<div className="col-sm-10">
						<input type="text"
								className="form-control"
								value={props.item}
								onChange={props.updateItem} />
					</div>
					<div className="col-sm-2">
						<button className="btn btn-info">
							登録
						</button>
					</div>
				</div>
			</form>
		);
	}

	function Task(props) {
		const task = props.task;

		return (
			<li className={props.task.active?'list-group-item active':'list-group-item'}
				onClick={() => props.changeActive(task)}>
				<div className="row">
					<div className="col-sm-10">
						<span>{props.task.task}</span>
					</div>
					<div className="col-sm-2">
						<button className="btn btn-danger pull-right"
							onClick={(e) => props.deleteTask(task, e)}>削除</button>
					</div>
				</div>
			</li>
		);
	}

	function Tasks(props) {
		const tasks = props.tasks.map(task => {
			return (
				<Task
					task={task}
					changeActive={props.changeActive}
					deleteTask={props.deleteTask}
				/>
			);
		});

		return tasks;
	}

	class Main extends React.Component {
		constructor() {
			super();
			this.state = {
				tasks: tasks,
				item: '',
			};
			this.changeActive = this.changeActive.bind(this);
			this.deleteTask   = this.deleteTask.bind(this);
			this.updateItem   = this.updateItem.bind(this);
			this.register     = this.register.bind(this);
		}

		componentDidMount() {
			$.getJSON('/todo/api/list', {}).done(function(data) {
				this.setState({
					tasks: data
				});
			}.bind(this));
		}

		changeActive(task) {
			const tasks = this.state.tasks.map(task => {
				return {
					id    : task.id,
					task  : task.task,
					active: task.active
				}
			});
			const index = this.state.tasks.map(task => {
				return task.id;
			}).indexOf(task.id);

			tasks[index].active = !tasks[index].active;
			// DB更新
			$.post('/todo/api/update', tasks[index], function(data) {
				// 結果確認
				// alert(JSON.stringify(data));
			});

			this.setState({
				tasks: tasks,
			});
		}

		deleteTask(task, e) {
			const tasks = this.state.tasks.slice();
			const index = this.state.tasks.indexOf(task);
			// 該当タスクを削除
			tasks.splice(index, 1);
			// タスク一覧をセット
			this.setState({
				tasks: tasks
			});
			// MongoDBのドキュメント削除
			$.post('/todo/api/del', {
				id: task.id
			}, function(data) {
				// 削除結果
				// alert(JSON.stringify(data));
			});
			// イベント伝播キャンセル
			e.stopPropagation();
		}

		updateItem(e) {
			this.setState({
				item: e.target.value
			});
		}

		register(e) {
			// イベントキャンセル
			e.preventDefault();
			// 文字列が空の場合スキップ
			if(!e.target.value) {
				return false;
			}
			// タスク一覧をコピー
			var tasks = this.state.tasks.slice();
			var now = new Date();
			// 一意のIDを生成
			var id = now.getFullYear();
			id += ("00" + (now.getMonth() + 1) ).slice(-2);
			id += ("00" + now.getDate()).slice(-2);
			id += ("00" + now.getHours()).slice(-2);
			id += ("00" + now.getMinutes()).slice(-2);
			id += ("00" + now.getSeconds()).slice(-2);
			id += "_";
			id += ("0000" + Math.floor(Math.random() * 10000) ).slice(-4);
			// 登録用のタスクを生成
			var task = {
				id    : id,
				task  : this.state.item,
				active: true,
			};
			// タスクを追加
			tasks.push(task);
			this.setState({
				tasks: tasks,
				item: '',
			});

			$.post('/todo/api/reg', task, function(data) {
				// MongoDBに登録
			});
		}

		render() {
			return (
				<div className="container">
					<Form
						item={this.state.item}
						updateItem={this.updateItem}
						register={this.register}
					/>
					<ul className="list-group">
						<Tasks
							tasks={this.state.tasks}
							changeActive={this.changeActive}
							deleteTask={this.deleteTask}
						/>
					</ul>
				</div>
			);
		}
	}

	ReactDOM.render(
		<Main/>,
		document.getElementById('main')
	);
})();