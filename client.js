var application = require('app');

require("home");
require("editor");
require("dashboard");
require("publications")

var epublica = angular.module('epublica',[
    "ui.router",
    'home',
    'editor',
    'dashboard',
    'publications'
]);


epublica.config(['$stateProvider','$urlRouterProvider',application.config]);

epublica.run(function($rootScope){
  //listens for changing state events
  $rootScope.$on("$stateChangeStart",function(event,toState,toParams,fromState,fromParams){
    var evtObj = {
      event:event,
      toState:toState,
      toParams:toParams,
      fromState:fromState,
      fromParams:fromParams
    }
    $rootScope.$broadcast("loadStart",evtObj);
  })
})
epublica.controller('MainApplicationController',application.controller);
module.exports = epublica;