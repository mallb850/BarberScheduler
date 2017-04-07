var express = require('express'),
     app = express(),
     passport = require('passport'),
     LocalStrategy = require('passport-local').Strategy,
     path = require('path'),
     AWS = require('aws-sdk'),
     expressValidator = require('express-validator'),
     flash = require('connect-flash'),
     cookieParser = require('cookie-parser'),
     fs = require('fs'),
     dynamoose = require('dynamoose'),
     connect = require('connect'),
     session = require('express-session'),
     MongoStore = require('connect-mongo')(session),
     morgan    = require('morgan'),
     bodyParser = require('body-parser'),
     methodOverride = require('method-override'),
     router = require('./routes/index.js'),
     jquery = require("jquery"),
     mongojs = require("mongojs"),
     mongoose = require('mongoose'),
     db = mongoose.connection,
     moment = require('moment');



app.use(express.static(__dirname + '/public/'));

//middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(expressValidator());
app.use(methodOverride());
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use('/', router);


// CORS headers

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
  next();
})

//view engine for server
app.set('views', path.join(__dirname + '/public/partials'));
app.engine('html', require('consolidate').handlebars);
app.set('view engine', 'html');

//config dom assets
app.use(express.static(__dirname + '/public/'));
app.use(express.static(__dirname + '/public/js'));
app.use(express.static(__dirname + '/public/styles'));
app.use(express.static(__dirname + '/node_modules/'));
app.use(express.static(__dirname + '/public/img'));
app.use(express.static(__dirname + '/public/partials'));


// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
    , root     = namespace.shift()
    , formParam = root;

    while(namespace.length){
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

//Connect flash
app.use(flash());

app.use(session({ cookie: { maxAge: 60000 },
                  secret: 'woot',
                  resave: true,
                  saveUninitialized: true,
                  store: new MongoStore({ mongooseConnection: mongoose.connection})
                }));

//Global Vars
app.use(function(req,res,next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


//listen
app.listen(process.env.PORT || 8080, function () {
    console.log("Server Listening ... Port 8080");
});

//Database
mongoose.connect('mongodb://localhost/BarberData');
console.log("Mongo DB connected");
