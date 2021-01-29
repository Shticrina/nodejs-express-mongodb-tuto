const express = require('express');
const router  = express.Router();
const {ensureAuthenticated} = require("../config/403.js");
// const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');

// models//models
const TodoTask = require("../models/TodoTask");
const User = require("../models/User");

// home page
router.get('/', (req, res) => {
    res.render('index', {
        user: req.user,
        page: 'home'
    });
});

/*app.get('/', (req, res) => {
	TodoTask.find({}, (err, tasks) => {
		res.render("home.ejs", { todoTasks: tasks });
	});
});*/

// add new task
router.post('/', async (req, res) => {
	const todoTask = new TodoTask({
		content: req.body.content
	});
	// console.log(todoTask);

	try {
		await todoTask.save();
		res.redirect("/");
	} catch (err) {
		res.redirect("/");
	}
});

module.exports = router;