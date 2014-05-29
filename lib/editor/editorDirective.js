/**
 * Created by JaneCockblocker on 29/05/2014.
 */

var contentEditor = function(){
  return{
    restrict:"A",
    replace:true,
    link:function(scope,el, atrrib, ctrl){
      console.log(scope);
    }
  }
}

module.exports = contentEditor;
