const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//models
const TodoTask = require("./models/TodoTask");

dotenv.config();

app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));

//connection to db
mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
	console.log("Connected to db yoo!");
	app.listen(3000, () => console.log("Server Up and running on 3000"));
});

app.set('view engine', 'ejs');

// Express routes
app.get('/', (req, res) => {
	// res.render('home.ejs');
	TodoTask.find({}, (err, tasks) => {
		// console.log(tasks);
		res.render("home.ejs", { todoTasks: tasks });
	});
});

// add new task
app.post('/',async (req, res) => {
	const todoTask = new TodoTask({
		content: req.body.content
	});

	console.log(todoTask);

	try {
		await todoTask.save();
		res.redirect("/");
	} catch (err) {
		res.redirect("/");
	}
});