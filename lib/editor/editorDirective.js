/**
 * Created by Larry Eliemenye on 29/05/2014.
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
        console.log(e)

      });

      //listen for handle text selection
      sheet.on("mouseup",function(){

      })

      sheet.on('change',function(e){
        console.log(e);
      })

      //Todo -  figure out how to check for overflows on edtiablke content divs are fire an event
      sheet.on('paste',function(e){
        console.log("Paste event fired!!");
      })


    }
  }
}

module.exports = contentEditor;
