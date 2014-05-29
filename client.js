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

epublica.run(function($rootScope){
  //listens for changing state events
  $rootScope.$on("$stateChangeStart",function(event,toState,toParams,fromState,fromParams){
    console.log(event)
  })
})
epublica.controller('MainApplicationController',application.controller);
module.exports = epublica;