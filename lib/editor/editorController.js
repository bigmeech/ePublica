/**
 * Created by Larry Eliemneye on 29/05/2014.
 */

//strategy pattern to change editor toolbar logic at run time base on what button was clicked

var boldStrategy = function(btn, string){

};


var editorController = function($scope){
  var CMD_BOLD            = "bold",
      CMD_ITALIC          = "italic",
      CMD_UNDERLINE       = "underline",
      CMD_JUSTIFY_LEFT    = "justifyLeft",
      CMD_JUSTIFY_CENTER  = "justifyCenter",
      CMD_JUSTIFY_RIGHT   = "jusftifyRight",
      CMD_JUSTIFY_FULL    = "justifyFull"

  var executeEditorCommand = function(DOMElement, cmdString){
    if(DOMElement.hasClass("kw-button-toggle-pressed")){
      DOMElement.removeClass("kw-button-toggle-pressed")
    }else{
      DOMElement.addClass("kw-button-toggle-pressed");
    }
    document.execCommand(cmdString);
  }

  $scope.exec= function(cmdString){
    var boldBtn = angular.element("#boldBtn");
    var italicBtn = angular.element("#italicBtn");
    var underlineBtn = angular.element("#underlineBtn");

    switch(cmdString){
      case CMD_BOLD:
        executeEditorCommand(boldBtn,cmdString);
        break;
      case CMD_ITALIC:
        executeEditorCommand(italicBtn,cmdString);
        break;
      case CMD_UNDERLINE:
        executeEditorCommand(underlineBtn,cmdString);
        break;
    }
  }
}

module.exports = editorController;
