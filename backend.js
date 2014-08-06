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
    pub = require("./lib/publications/routes")(database),
    userAuth = database.getModel("User")
    //console.log(userAuth)

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
        secret:"Opensesamie85"
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.errorHandler());

    //passport auth config
    passport.use(new LocalStrategy(userAuth.authenticate()));
    passport.serializeUser(userAuth.serializeUser());
    passport.deserializeUser(userAuth.deserializeUser());
});

//Route PassThroughs
var getError = function(message, status){
    var e = new Error(message);
    e.status = status;
    return e;
}

var isLoggedIn = function(req,res,next){
    if(req.session.loggedIn){
        console.log({
            message:"User Signed In:"+req.session.loggedIn,
            session_id: req.session.id
            });
        next()
    }
    else return next(getError("User is not currently logged in",401))
}

// development only
if ('development' == app.get('env')) {
}

//express route definitions
//----------------------------------------------
app.get('/', function (req, res) {res.render('index')});
app.post('/signup', auth.signup);

//publications api
app.get('/publication/:pubId', isLoggedIn, pub.getPublication, function(){

});
app.post('/publication/:pubId', isLoggedIn, pub.setPublication);
app.post('/publication', isLoggedIn, pub.createPublication);
app.delete('/publication/:pubId', isLoggedIn, pub.deletePublication);

//auth api
app.post('/signin', passport.authenticate('local'),function(req,res){
    req.session.loggedIn = true;
    console.log(req.session.id);
    res.json("#/main/dashboard/");
});

app.post('/signout',function(req,res){
    req.session.destroy();
    req.logout();
    res.redirect("login");
});

/*app.all('*', function(req,res){
    res.render('lost');
});*/

dbcon.on('error',console.error.bind(console,'Failed to Connect to Mongo Via Mongoose'))
dbcon.once('open',function(err, connection){
    if(err) throw err
    app.listen(app.get('port'))
    console.log('Express server listening on port ' + app.get('port'));
})
