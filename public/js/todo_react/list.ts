(() => {
	var tasks = [];

	function Task(props) {
		const task = props.task;

		return (
			<li className={props.task.active?'list-group-item active':'list-group-item'}
				onClick={() => props.changeActive(task)}>
				<div className="row">
					<div className="col-sm-10">
						<span>{props.task.task}</span>
					</div>
					<button className="col-sm-2 btn btn-danger pull-right"
						onClick={(e) => props.deleteTask(task, e)}>削除</button>
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
			};
			this.changeActive = this.changeActive.bind(this);
			this.deleteTask = this.deleteTask.bind(this);
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
			e.stopPropagation();
		}

		render() {
			return (
				<ul className="list-group">
					<Tasks
						tasks={this.state.tasks}
						changeActive={this.changeActive}
						deleteTask={this.deleteTask}
					/>
				</ul>
			);
		}
	}

	ReactDOM.render(
		<Main/>,
		document.getElementById('main')
	);
})();