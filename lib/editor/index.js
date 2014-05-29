var editor = angular.module("editor",[])
editor.directive("editorDirective", require("./editorDirective"));
editor.controller("EditorController", require("./editorController"))
module.exports = editor;