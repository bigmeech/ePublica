/**
 * Created by Larry Eliemenye on 29/05/2014.
 */

var vLoader = function($rootscope){
  return{
    restrict:"A",
    replace:true,
    termplateUrl:"/build/viewLoader/views/template.html",
    link:function(scope, el, attrib, ctrl){
      $rootscope.$on("loadStart",function(event){
        rootscope.loading = false
        console.log(event);
      })
    }
  }

}
