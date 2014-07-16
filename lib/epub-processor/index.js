
var admZip  = require("adm-zip"),
    xml2js  = require("xml2js"),
    fs      = require("fs")


function ePubProcessor(){

}

function createBoilerPlate(){

    //build container - check current directory to see if any other epXXXX file exist
    var cDir =  __dirname
    console.log(cDir)
}

ePubProcessor.prototype.build = function(metadata, path){
    //create boilerplate epubfile
    console.log(path);
}

module.exports = new ePubProcessor();