const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = express.Router();
const expressEjsLayout = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const path = require("path");

const public = path.join(__dirname, '/public');
const root = path.join(__dirname, '/');

const TodoTask = require(root + "models/TodoTask");
console.log(root);
console.log(root + "models/TodoTask");
console.log("----------------------");


// var Router = require('./modules/router/router');
// var router = new Router(path.join(__dirname,'routes'));

//  heroku config:set NODE_MODULES_CACHE=false --app name


require(root + "config/passport")(passport);
dotenv.config();

app.use(express.static(public));
// app.use("/static", express.static("public"));

// app.use(express.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(mongoSanitize());

// Mongoose settings & connection to db
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useUnifiedTopology', true);
// mongoose.set('useCreateIndex', true);
mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
	console.log("Connected to db yoo!");
	// app.listen(3000, () => console.log("Server Up and running on 3000"));
});

// Ejs
app.set('view engine', 'ejs');
app.use(expressEjsLayout);

// Sessions
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));

// Passport auth
app.use(passport.initialize());
app.use(passport.session());

// Flash
app.use(flash());
app.use((req,res,next)=> {
    // res.locals.success_msg = req.flash('success_msg');
    // res.locals.error_msg = req.flash('error_msg');
    // res.locals.error  = req.flash('error');
    next();
});

// Routes
// app.use('/', require('./routes/index'));
app.use('/', require(root + 'routes/pages'));
app.use('/users', require(root + 'routes/auth'));
// app.use('/admin', require('./routes/admin'));

app.listen(process.env.PORT || 3000);