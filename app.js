// REQUIRE
const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const session = require('express-session');
const mustache = require('mustache-express');
// const validator = require('express-validator');
const User = require('./models/user.js');


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
//Parser mid.w
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Session mid.w
app.use(session({
  secret: 'keyboard dog',
  resave: false,
  saveUninitialized: true
}))


// STATIC FILE/ DIR -----------------------------------
// Styles
app.use(express.static('public'));


 // app.use(function (req, res, next) {
//   var views = req.session.views
//
//   if (!views) {
//     views = req.session.views = {}
//   }
//
//   // get the url pathname
//   var pathname = parseurl(req).pathname
//
//   // count the views
//   views[pathname] = (views[pathname] || 0) + 1
//
//   next()
// })
//
//
// app.get('/foo', function (req, res, next) {
//   res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
// })
//
// app.get('/bar', function (req, res, next) {
//   res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
// })

// APP.GET()
// app.get('/', function (req, res) {
//    res.redirect('/login/');
// })
app.get('/login/', function (req, res) {
   res.render('login', function authenticate(req, username, password) {
   var authenticatedUser = data.users.find(funciton(user) {
      if (user.username === username && user.password === password) {
         req.session.authentication = true;
         console.log('User and Password Authenticated')
      } else {
         return false;
      }
      return req.session;

   });
});

});

// APP.POST
app.post('/login/', function(req, res){
   var username = req.body.username;
   var password = req.body.password;
   authenticate(req, username, password);
   if (req.session && req.session.authenticated) {
      res.redirect('/');
      res.render('index', {username : username})
   }
})

// PORT
app.listen(3000, function(){
   console.log('Listening on port 3000!');
});
