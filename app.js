// REQUIRE
const express = require('express');
// const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const data = require('./userData.js');
// for when you get your gen user auth going..
// const authorize = require('./routes/auth.js')
console.log(data);

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

// Session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

// // Amy's custom- MW FUNCTION FOR AUTH
function authenticate(req, username, password) {
   console.log('authenticating');
   var authenticatedUser = data.users.find(function (user) {
    if (username === user.username && password === user.password) {
      req.session.authenticated = true;
      console.log('User & Password Pass Authentication!');
    } else {
      console.log('Unauthorized!');
      return false;
      // res.redirect('/login')
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
   var username = req.body.username;
   var password = req.body.password;
   console.log(username);
   console.log(password);
   authenticate(req, username, password);
   if (req.session && req.session.authenticated) {
      res.render('index', { username: req.body.username });
   } else {
      res.redirect('/login');
   }
});

app.get('/login',function(req, res){
   res.render('login');
});


// APP.POST
app.post('/login', function(req, res) {
      var username = req.body.username;
      var password = req.body.password;
      authenticate(req, username, password);
      if (req.session && req.session.authenticated) {
         console.log("you are authenticated!");
         res.redirect('/');
         // res.render('index', {username : username})
      } else {
         return;
      }
});

// PORT
app.listen(3000, function(){
   console.log('Listening on port 3000!');
});
