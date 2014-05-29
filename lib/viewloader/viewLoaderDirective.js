/**
 * Created by JaneCockblocker on 29/05/2014.
 */

var vLoader = function($rootscope){
  return{
    restrict:"A",
    replace:true,
    termplateUrl:"/build/viewLoader/views/template.html",
    link:function(scope, el, attrib, ctrl){
      scope.on("loadEnd",function(){
        rootscope.loading = false
        console.log(scope);
      })
    }
  }

}