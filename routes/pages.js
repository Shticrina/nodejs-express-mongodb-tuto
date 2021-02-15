const express = require('express');
const router  = express.Router();
const {ensureAuthenticated} = require("../config/403.js");
const bcrypt = require('bcrypt');

const TodoTask = require("../models/TodoTask");
const User = require("../models/User");

// Get all tasks for the homepage
router.get('/', (req, res) => {
    /*res.render('index', {
        user: req.user,
        page: 'home'
    });*/

    TodoTask.find({}, (err, tasks) => {
    	// console.log(req.body);
		res.render("index.ejs", { todoTasks: tasks, task: {}, sup: 'drooo' });
	});
});

// Add new task
router.post('/', async (req, res) => {
	const todoTask = new TodoTask({
		content: req.body.content
	});

	try {
		await todoTask.save();
		res.redirect("/");
	} catch (err) {
		res.redirect("/");
	}
});

router.post('/update', (req, res) => {
    const id = req.body.id;

    TodoTask.findByIdAndUpdate(id, { content: req.body.title }, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});

//Delete
router.get("/remove/:id", (req, res) => {
// router.post("/remove", (req, res) => {
    const id = req.params.id;
    // const id = req.body.id;

    TodoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/"); 
    });
});

module.exports = router;