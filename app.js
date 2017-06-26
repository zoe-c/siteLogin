// REQUIRE
const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const session = require('express-session');
const mustache = require('mustache-express');
// const validator = require('express-validator');
const users = require('./models/user.js');


// CREATE APP
var app = express();

// DATA + CONTENT(added with require(ments) instead)
// const User = require('./models/user');
// console.log(User.find('Landry'));
// console.log(User.all);

// SET ENVIRONMENT/ TEMPLATE ENGINE---------------------
// View Engine
// ----------------------------
const mustacheExpress = require('mustache-express');
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

// MIDDLEWARE-------------------------
//Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Session middleware
app.use(session({
  secret: 'keyboard dog',
  resave: false,
  saveUninitialized: true
}))

// // Amy's custom- MW FUNCTION FOR AUTH
function authenticate(req, username, password) {
  var authenticatedUser = users.find(function (user) {
    if (username === user.username && password === user.password) {
      req.session.authenticated = true;
      console.log('User & Password Authenticated');
    } else {
      return false;
    }
  });
  console.log(req.session);
  return req.session;
}

// // STATIC FILE/ DIR -----------------------------------
// // Styles *******NOTE:WORRY ABOUT STYLES LATER
// app.use(express.static('public'));


// APP.GET()
app.get('/', function (req, res) {
   // authenticate(req, username, password);
   if (req.session && req.session.authenticated) {
      res.render('index', {username : username});
   } else {
      res.redirect('/login/');
   }
});

app.get('/login/',function(req, res){
   res.render('login', console.log('HERE IS YOUR FORM'));
});


// APP.POST
app.post('/login/', function(req, res){
   var username = req.body.username;
   var password = req.body.password;
   authenticate(req, username, password);
   if (req.session && req.session.authenticated) {
      console.log("you are authenticated!");
      // res.redirect('/');
      // res.render('index', {username : username})
   }
})

// PORT
app.listen(3000, function(){
   console.log('Listening on port 3000!');
});
