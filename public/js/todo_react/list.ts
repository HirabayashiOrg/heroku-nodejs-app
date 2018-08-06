(() => {
	const tasks = [
		{id: 0, task: 'task1', status: 1},
		{id: 1, task: 'task2', status: 1},
		{id: 2, task: 'task3', status: 0},
	];

	function Tasks(props) {
		const tasks = props.tasks.map(task => {
			return (
				<li>{task.task}</li>
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
		}

		render() {
			return (
				<ul>
					<Tasks
						tasks={this.state.tasks}
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