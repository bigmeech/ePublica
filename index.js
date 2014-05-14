var application = require('app');

require("home");
require("editor");

var app = angular.module('epublica',[
    "ui.router",
    'home',
    'editor'
]);

app.config(['$stateProvider','$urlRouterProvider',application.config]);
app.controller('MainApplicationController',application.controller);
module.exports = app;