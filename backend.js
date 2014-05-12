
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var cons = require("consolidate");

//routes definition
var users = require('./lib/users/routes')

var app = express();

// all environments
app.configure(function(){
    app.engine('html', cons.ejs);
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
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
})

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', users.index);
app.get('/users', users.getUser);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
