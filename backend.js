/**
 * Module dependencies.
 */

var express = require('express'),
    app = express(),
    http = require('http'),
    path = require('path'),
    cons = require("consolidate"),
    passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    mongoose = require("mongoose"),
    epub = require("./lib/epub-processor"),
    fs = require("fs"),
    RedisStore = require("connect-redis")(express);

//init Mongoose and get DB Connection
mongoose.connect("mongodb://localhost/kawee")
var dbcon = mongoose.connection,
    database = require('./lib/database')(mongoose);

//routes definition
var users = require('./lib/users/routes')(database),
    auth = require('./lib/auth/routes')(database),
    pub = require("./lib/publications/routes")(database)


var staticDir = path.join(__dirname, "/public");


// all environments
app.configure(function () {
    app.engine('html', cons.ejs);
    app.set('port', process.env.PORT || 3010);
    app.set('views', staticDir);
    app.set('view engine', 'html');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.multipart());
    app.use(express.cookieParser('Opensesamie85'));
    app.use(express.session({
        store:new RedisStore({
            host:'localhost',
            port:6379,
            db:2
        }),
        scecret:"Opensesamie85"
    }));
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.errorHandler());

    //passport auth config
    passport.use(new LocalStrategy(auth.verifier));
    passport.serializeUser(auth.serialiseUser());
    passport.deserializeUser(auth.deserialiseUser());
});

//Route PassThroughs
var getError = function(message, status){
    var e = new Error(message);
    e.status = status;
    return e;
}

var isLoggedIn = function(req,res,next){
    console.log(req.session.loggedIn);
    var loggedIn = req.session.loggedIn;
    if(!loggedIn){
        return next(getError("User is Not Logged In",401)) // Unauthoriased Loggin
    }
    return next()
}

// development only
if ('development' == app.get('env')) {
}

//express route definitions
//----------------------------------------------
app.get('/', function (req, res) {res.render('index')});
app.post('/signup', auth.signup);

//publications api
app.get('/publication/:pubId', isLoggedIn, pub.getPublication);
app.post('/publication/:pubId', isLoggedIn, pub.setPublication);
app.post('/publication', isLoggedIn, pub.createPublication);
app.delete('/publication/:pubId', isLoggedIn, pub.deletePublication);

//auth api
app.post('/login', auth.verifier);


app.get('/loginGood', function (req, res) {
    res.send("Welcome to profile");
});
app.get('/loginBad', function (req, res) {
    res.send("Failed to LogIn");
    console.log("Login Bad Called");
});
app.all('*', function(req,res){
    res.render('lost');
});

dbcon.on('error',console.error.bind(console,'Failed to Connect to Mongo Via Mongoose'))
dbcon.once('open',function(err, connection){
    if(err) throw err
    app.listen(app.get('port'))
    console.log('Express server listening on port ' + app.get('port'));
})
