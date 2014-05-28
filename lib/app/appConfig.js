/**
 * Created by JaneCockblocker on 14/05/14.
 */
module.exports = function($stateProvider, $urlRouteProvider){
  $urlRouteProvider.otherwise('/dashboard')
  $stateProvider.state('dashboard',{
    url:"/dashboard",
    controller:"DashboardController",
    templateUrl:"/build/dashboard/views/template.html"
  });

}