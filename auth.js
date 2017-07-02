// const express = require('express');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const data = require('./userData.js');
//
// var app = express();
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
//
// app.use(session({
//   secret: 'ssshhh',
//   resave: false,
//   saveUninitialized: true
// }));
//
//
// function authenticate(req, username, password) {
//    console.log('authenticating');
//    var authenticatedUser = data.users.find(function (user) {
//     if (username === user.username && password === user.password) {
//       return req.session.authenticated = true;
//       console.log('User & Password Pass Authentication!');
//     } else {
//       console.log('Unauthorized!');
//       return req.session.autheticated = false;
//       res.redirect('/login');
//      }
//    });
//    console.log(req.session);
//    return req.session;
// }
//
// module.exports = {
//    authenticate : authenticate
// }
