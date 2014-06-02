/**
 * Created by JaneCockblocker on 29/05/2014.
 */

var contentEditor = function(){
  return{
    restrict:"A",
    replace:true,
    scope:true,
    link:function(scope,element, atrrib, ctrl){
      //needed varables
      var sheet = element;
      var textSelection = null;
      var ENTER_KEY = 13;

      //listen for enter key press
      sheet.on("keypress", function(e){
        switch(e.keyCode){
          case ENTER_KEY:
            insetNewParagraph()
            break;
        }
      });

      //listen for handle text selection
      sheet.on("mouseup",function(){
        textSelection = window.getSelection();
        if(textSelection.type === "Range"){
          var selectedRange = textSelection.toString()
          console.log(selectedRange);
        }
      })


    }
  }
}

module.exports = contentEditor;
