var application = require('app');
    config      = require("config");

require("home");
require("editor");

var app = angular.module("epublica",[
    'home',
    'editor'
])

app.configure(['$locationProvider'])