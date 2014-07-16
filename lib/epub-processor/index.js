
var admZip  = require("adm-zip"),
    xml2js  = require("xml2js"),
    fs      = require("fs")


function ePubProcessor(){

}

ePubProcessor.prototype.createBoilerPlate = function(path){
    //build container - check current directory to see if any other epXXXX file exist
    fs.exists(path, function(exists){
        if(!exists){
            fs.mkdir(path+"/epub0001", function(dir){
                console.log(dir);
            });
        }
    });
}

ePubProcessor.prototype.build = function(metadata, path){
    //create boilerplate epubfile
    console.log(path);
}

module.exports = new ePubProcessor();