/**
 * Created by JaneCockblocker on 29/05/2014.
 */

var contentEditor = function(){
  return{
    restrict:"A",
    replace:true,
    link:function(scope,element, atrrib, ctrl){
      //needed varables
      var sheet = element;
      var textSelection = null;
      var ENTER_KEY = 13;

      //process text selection
      var processSelection = function(data,baseOffset, extendedOffset){
        var wholeText = data;
        var selectionOffset = baseOffset;
        var wholeSelection = extendedOffset;
        return wholeText.substring(baseOffset,wholeSelection);
      }

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
          console.log(processSelection(textSelection.anchorNode.data,textSelection.baseOffset,textSelection.extentOffset))
        }
      })


    }
  }
}

module.exports = contentEditor;
