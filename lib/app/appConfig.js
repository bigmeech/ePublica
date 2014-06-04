/**
 * Created by JaneCockblocker on 14/05/14.
 */
module.exports = function($stateProvider, $urlRouterProvider){
  //default route
  $urlRouterProvider.otherwise('/dashboard');
  //defines
  $stateProvider.state('dashboard',{
    url:"/dashboard",
    controller:"DashboardController",
    templateUrl:"build/dashboard/views/template.html"
  }).state('dashboard.home',{
    url:"/home",
    controller:"HomeController",
    templateUrl:"build/home/views/template.html"
  }).state('dashboard.publications',{
    url:"/publications",
    controller:"PublicationsController",
    templateUrl:"build/publications/views/template.html"
  }).state("dashboard.editor",{
    url:"/editor",
    controller:"EditorController",
    templateUrl:"build/editor/views/template.html"
  });
}