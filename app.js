// REQUIRE
const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const data = require('./userData.js');
// for when you get your gen user auth going..
// const authorize = require('./auth.js')


// CREATE APP
var app = express();

// SET ENVIRONMENT/ TEMPLATE ENGINE---------------------
// View Engine
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

// MIDDLEWARE-------------------------
//Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// ExpValidator
app.use(expressValidator());

// Session middleware
app.use(session({
  secret: 'ssshhh',
  resave: false,
  saveUninitialized: true
}));

//Auth function. could drag this into a sep js
function authenticate(req, username, password) {
   // console.log('authenticating');
   var authenticatedUser = data.users.find(function (user) {
    if (username === user.username && password === user.password) {
      return req.session.authenticated = true;
      // console.log('User & Password Pass Authentication!');
    } else {
      // console.log('Unauthorized!');
      return req.session.autheticated = false;
      res.redirect('/login');
     }
   });
   console.log(req.session);
   return req.session;
}

// // STATIC FILE/ DIR -----------------------------------
// // Styles *******NOTE:WORRY ABOUT STYLES LATER
// app.use(express.static('public'));



// REQUESTS------------------------------------------------
app.get('/', function (req, res) {
      res.redirect('/login');
});

app.get('/login' ,function(req, res){
   res.render('login');
});


app.post('/login', function(req, res) {
      let username = req.body.username;
      let password = req.body.password;
      authenticate(req, username, password);
      if (req.session && req.session.authenticated) {
         // console.log("you are authenticated!");
         res.render('index', {username : username})
      } else {
         res.redirect('/login');
      };
});

app.post('/go-to-signup', function(req, res) {
   res.redirect('/sign-up');
});

app.get('/sign-up', function(req, res){
   res.render('signUp')
});

// app.post('/sign-up', function(req, res){
//    var addUser = data.users.push({username: req.body.username, password: req.body.password});
//    console.log(users);
//    res.send('Thanks for signing up!');
// });
//

// PORT
app.listen(3000, function(){
   // console.log('Listening on port 3000!');
});
