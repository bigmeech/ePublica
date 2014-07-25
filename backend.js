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
    mClient = require('mongodb').MongoClient,
    mServer = require('mongodb').Server,
    epub = require("./lib/epub-processor"),
    fs = require("fs"),
    mongoClient = new mClient(new mServer('localhost',27017,{native_parser:true})),
    database = mongoClient.db("kawee");

//routes definition
var users = require('./lib/users/routes')(database),
    pass = require('./lib/auth/routes')(database),
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
    app.use(express.cookieParser('your secret here'));
    app.use(express.session({secret: "Opensesamie85"}));
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.errorHandler());
    passport.use(new LocalStrategy(
        function (username, password, done) {
            process.nextTick(function () {
                return done;
            })
        }));
})

// development only
if ('development' == app.get('env')) {
}

//express route definitions
//----------------------------------------------
app.get('/', function (req, res) {
    res.render('index')
});
app.get('/users', users.getUser);

//publications api
app.get('/publication/:pubId',pub.getPublication);
app.post('/publication/:pubId',pub.setPublication);
app.put('/publication', pub.createPublication);
app.delete('/publication/:pubId', pub.deletePublication);

//auth api
app.post('/login',passport.authenticate('local', {successRedirect: '/loginGood', failureRedirect: '/loginBad'}));

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
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

mongoClient.open(function(err, mongoc){
    if(err) throw err
    app.listen(app.get('port'))
    console.log('Express server listening on port ' + app.get('port'));
})
