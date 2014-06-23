
/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(path, parent, orig) {
  var resolved = require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err.require = true;
    throw err;
  }

  var module = require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module._resolving && !module.exports) {
    var mod = {};
    mod.exports = {};
    mod.client = mod.component = true;
    module._resolving = true;
    module.call(this, mod.exports, require.relative(resolved), mod);
    delete module._resolving;
    module.exports = mod.exports;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path) {
  if (path.charAt(0) === '/') path = path.slice(1);

  var paths = [
    path,
    path + '.js',
    path + '.json',
    path + '/index.js',
    path + '/index.json'
  ];

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (require.modules.hasOwnProperty(path)) return path;
    if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
  }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to) {
  if (!require.modules.hasOwnProperty(from)) {
    throw new Error('Failed to alias "' + from + '", it does not exist');
  }
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function localRequire(path) {
    var resolved = localRequire.resolve(path);
    return require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return require.normalize(p, path);

    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    var segs = parent.split('/');
    var i = lastIndexOf(segs, 'deps') + 1;
    if (!i) i = 0;
    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
    return path;
  };

  /**
   * Check if module is defined at `path`.
   */

  localRequire.exists = function(path) {
    return require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};
require.register("app/index.js", function(exports, require, module){

module.exports = {
  config:require("./appConfig"),
  controller:require("./appController")
}

});
require.register("app/appConfig.js", function(exports, require, module){
/**
 * Created by JaneCockblocker on 14/05/14.
 */
module.exports = function($stateProvider, $urlRouterProvider){
  //default route
  $urlRouterProvider.otherwise('/dashboard');
  //defines
  $stateProvider.state('dashboard',{
    url:"/dashboard",
    controller:"DashboardController",
    templateUrl:"build/dashboard/views/template.html"
  }).state('dashboard.home',{
    url:"/home",
    controller:"HomeController",
    templateUrl:"build/home/views/template.html"
  }).state('dashboard.publications',{
    url:"/publications",
    controller:"PublicationsController",
    templateUrl:"build/publications/views/template.html"
  }).state("dashboard.editor",{
    url:"/editor",
    controller:"EditorController",
    templateUrl:"build/editor/views/template.html"
  });
}
});
require.register("app/appController.js", function(exports, require, module){
/**
 * Created by JaneCockblocker on 14/05/14.
 */

module.exports = function($scope){

}
});
require.register("editor/index.js", function(exports, require, module){
var editor = angular.module("editor",[])
editor.directive("editorDirective", require("./editorDirective"));
editor.controller("EditorController", require("./editorController"))
module.exports = editor;
});
require.register("editor/editorDirective.js", function(exports, require, module){
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

});
require.register("editor/editorController.js", function(exports, require, module){
/**
 * Created by JaneCockblocker on 29/05/2014.
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
});
require.register("home/index.js", function(exports, require, module){
var homeController =  require("./homeController")

var home = angular.module("home",[]);
home.controller("HomeController",homeController);
module.exports = home;
});
require.register("home/homeController.js", function(exports, require, module){
/**
 * Created by JaneCockblocker on 14/05/14.
 */

var homeController = function($scope){

}

module.exports = homeController;
});

require.register("dashboard/index.js", function(exports, require, module){
//dashboard module
var dashboard = angular.module("dashboard",[])
dashboard.controller('DashboardController', require('./dashboardController'));
module.exports = dashboard;
});
require.register("dashboard/dashboardController.js", function(exports, require, module){
/**
 * Created by JaneCockblocker on 27/05/2014.
 */
var DashboardController = function($rootScope, $scope, $http){

}

module.exports = DashboardController;
});
require.register("publications/index.js", function(exports, require, module){
var pubs = angular.module("publications",[])
pubs.controller("PublicationsController",require("./publicationsController"));
module.exports = pubs;

});
require.register("publications/publicationsController.js", function(exports, require, module){
/**
 * Created by JaneCockblocker on 30/05/2014.
 */
var pubsController = function($scope){

}

module.exports = pubsController;
});
require.register("epublica/client.js", function(exports, require, module){
var application = require('app');

require("home");
require("dashboard");
require("publications");

var epublica = angular.module('epublica',[
    "ui.router",
    'home',
    'dashboard',
    'publications'
]);

epublica.config(['$stateProvider','$urlRouterProvider',application.config]);

epublica.run(function($rootScope){
  //listens for changing state events
  $rootScope.$on("$stateChangeStart",function(event,toState,toParams,fromState,fromParams){
    var evtObj = {
      event:event,
      toState:toState,
      toParams:toParams,
      fromState:fromState,
      fromParams:fromParams
    }
    $rootScope.$broadcast("loadStart",evtObj);
  })
})
epublica.controller('MainApplicationController',application.controller);
module.exports = epublica;
});












require.alias("app/index.js", "epublica/deps/app/index.js");
require.alias("app/appConfig.js", "epublica/deps/app/appConfig.js");
require.alias("app/appController.js", "epublica/deps/app/appController.js");
require.alias("app/index.js", "epublica/deps/app/index.js");
require.alias("app/index.js", "app/index.js");
require.alias("app/index.js", "app/index.js");
require.alias("editor/index.js", "epublica/deps/editor/index.js");
require.alias("editor/editorDirective.js", "epublica/deps/editor/editorDirective.js");
require.alias("editor/editorController.js", "epublica/deps/editor/editorController.js");
require.alias("editor/index.js", "epublica/deps/editor/index.js");
require.alias("editor/index.js", "editor/index.js");
require.alias("editor/index.js", "editor/index.js");
require.alias("home/index.js", "epublica/deps/home/index.js");
require.alias("home/homeController.js", "epublica/deps/home/homeController.js");
require.alias("home/index.js", "epublica/deps/home/index.js");
require.alias("home/index.js", "home/index.js");
require.alias("home/index.js", "home/index.js");

require.alias("dashboard/index.js", "epublica/deps/dashboard/index.js");
require.alias("dashboard/dashboardController.js", "epublica/deps/dashboard/dashboardController.js");
require.alias("dashboard/index.js", "epublica/deps/dashboard/index.js");
require.alias("dashboard/index.js", "dashboard/index.js");
require.alias("dashboard/index.js", "dashboard/index.js");
require.alias("publications/index.js", "epublica/deps/publications/index.js");
require.alias("publications/publicationsController.js", "epublica/deps/publications/publicationsController.js");
require.alias("publications/index.js", "epublica/deps/publications/index.js");
require.alias("publications/index.js", "publications/index.js");
require.alias("publications/index.js", "publications/index.js");
require.alias("epublica/client.js", "epublica/index.js");