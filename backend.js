
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var cons = require("consolidate");
var authServer = require("oauthorize").createServer();
var passport = require("passport");
var localStrategy = require("passport-local").Strategy;
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/epublica");
//db models
var UserModel = null;
var AuthorModel = null;
var BookModel = null;


//routes definition
var users = require('./lib/users/routes');
var pass = require('./lib/auth/routes');
//console.log(typeof pass);
var app = express();
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
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new localStrategy({
      usernameField:"email",
      passwordField:"password"
    },pass.verifier));
})

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//mongodb connections
//--------------------------------------------------
var db = mongoose.connection
db.on("open",function(){
  //On Open suceed,
  var userSchema = mongoose.Schema({
    username:String,
    password:String,
    email:String
  });

  var authorSchema = mongoose.Schema({
    name:String,
    email:String,
    dateCreated:Date
  });

  var bookSchema = mongoose.Schema({
    title:String,
    synopsis:String,
    price: Number,
    rating:Number
  });
  UserModel = mongoose.model('user',userSchema);
  AuthorModel = mongoose.model('author',authorSchema);
  BookModel = mongoose.model('book',bookSchema);
})

//on DB open error
//----------------------------------------------
db.on("error",function(err){
  console.log("Error Opening mongodb"+err)
});

//express route definitions
//----------------------------------------------
app.get('/', function(req,res){res.render('index')});
app.get('/users', users.getUser);
app.post('/login',
    passport.authenticate('local',{
  successRedirect:'/main',
  failureRedirect:'/login'}));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
