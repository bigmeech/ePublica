//dashboard module
var dashboard = angular.module("dashboard",[])
dashboard.controller('DashboardController', require('./dashboardController'));
module.exports = dashboard;