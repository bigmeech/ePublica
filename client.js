var application = require('app');

require("home");
require("editor");
require("dashboard");

var epublica = angular.module('epublica',[
    "ui.router",
    'home',
    'editor',
    'dashboard'
]);

epublica.config(['$stateProvider','$urlRouterProvider',application.config]);
epublica.controller('MainApplicationController',application.controller);
module.exports = epublica;