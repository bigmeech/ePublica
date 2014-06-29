
/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var cons = require("consolidate");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mClient = require('mongodb').MongoClient;
var mServer = require('mongodb').Server;

//var db = require("./lib/database");

//db models

//routes definition
var users = require('./lib/users/routes');
var pass = require('./lib/auth/routes');
var pub = require("./lib/publications/routes")
//console.log(typeof pass)
var staticDir = path.join(__dirname, "/public");



// all environments
app.configure(function(){
    app.engine('html', cons.ejs);
    app.set('port', process.env.PORT || 3000);
    app.set('views', staticDir);
    app.set('view engine', 'html');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session({secret:"Opensesamie85"}));
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.errorHandler());
    passport.use(new LocalStrategy(
        function(username,password,done){
          process.nextTick(function(){
            return done;
          })
        }));
})

// development only
if ('development' == app.get('env')) {}

//express route definitions
//----------------------------------------------
app.get('/', function(req,res){res.render('index')});
app.get('/users', users.getUser);
app.post('/createPub',pub.createPub);
app.get('/deletePub',pub.deletePub);

app.post('/login',
  passport.authenticate('local',{successRedirect:'/loginGood',failureRedirect:'/loginBad'})
);

passport.serializeUser(function(user, done){
  done(null,user);
});
passport.deserializeUser(function(user, done){
  done(null,user);
});
app.get('/loginGood',function(req,res){
  res.send("Welcome to profile");
});
app.get('/loginBad',function(req,res){
  res.send("Failed to LogIn");
  console.log("Login Bad Called");
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
