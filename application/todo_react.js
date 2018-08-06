exports.list = function(req, res) {
	var name = req.params.name;

	res.render('todo_react/list', {name: name});
}