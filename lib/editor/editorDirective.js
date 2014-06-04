/**
 * Created by JaneCockblocker on 29/05/2014.
 */

var contentEditor = function(){
  return{
    restrict:"A",
    replace:true,
    scope:true,
    controller:function($scope){

    },
    link:function(scope,element, atrrib, ctrl){
      //needed varables
      var sheet = element;
      var textSelection = null;
      var ENTER_KEY = 13;

      //listen for enter key press
      sheet.on("keypress", function(e){
        console.log(ctrl)
      });

      //listen for handle text selection
      sheet.on("mouseup",function(){

      })


    }
  }
}

module.exports = contentEditor;
