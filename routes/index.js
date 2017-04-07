var express = require('express'),
    expressValidator = require('express-validator'),
    router = express.Router(),
    User = require('../models/user'),
    Event = require('../models/event'),
    passport = require('passport'),
    flash = require('connect-flash'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose');


    mongoose.createConnection('mongodb://localhost/BarberData');
    var db = mongoose.connection;

//GET ROUTES

router.get('/', function (req, res) {
    res.render('index');
});

router.get('/register/users', function (req, res) {
    res.render('register/users');
});

router.get('/login', function (req, res) {
    res.render('login');
});

router.get('/schedule/events', function (req, res) {
    Event.find({})
    .exec(function(err,events) {
      if(err){
        throw err;
      }
      else {
        res.json(events);
      }
    })
});



//POST User ROUTES

router.post('/schedule/newEvent', function(req,res) {
  var name = req.body.name;
  var date = req.body.date;
  var time = req.body.time;
  var comment = req.body.comment;

  var newEvent = new Event ({
    name: name,
    date: date,
    time: time,
    comment: comment
  });

  Event.createEvent(newEvent, function(err, events) {
    if(err) throw err;
    console.log(events);
    return res.redirect('/');
  })
})

router.post('/register/users', function (req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;


    // Validation

    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('firstname', 'First name is required').notEmpty();
    req.checkBody('lastname', 'Last name is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if(errors) {
      router.get('/register', function (req, res) {
          res.render('register', {
            errors: errors
          });
      });
        }
    else {
      var newUser = new User ({
        username: username,
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: password
      });
      User.createUser(newUser,function(err,user) {
        if(err) throw err;
        console.log(user);
      });
      return res.redirect('/#!/login');
    }
});

passport.use(new LocalStrategy(
  function(username,password,done) {
    User.getUserByUsername(username, function(err,user) {
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'Unknown User'});
      }
      User.comparePassword(password,user.password,function(err, isMatch){
          if(err) throw err;
          if(isMatch) {
            return done(null, user);
          }
          else {
            return done(null, false, {message: 'Invalid password'});
          }
      })
    })
  }
));

  passport.serializeUser(function(user,done) {
    done(null,user.id);
  });

  passport.deserializeUser(function(id,done) {
    User.getUserById(id, function(err,user) {
      done(err,user);
    });
  });

router.post('/login',
passport.authenticate('local', {successRedirect: '/',failureRedirect: '/#!/login', failureFlash: true}),
function(req,res) {
    res.redirect('/');
  });

router.get('/logout', function(req,res) {
  req.logout();
  res.redirect('/#!/login');
});


module.exports = router;
