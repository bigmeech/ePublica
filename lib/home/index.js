var homeController =  require("./homeController")

var home = angular.module("home",[]);
home.controller("HomeController",homeController);
module.exports = home;