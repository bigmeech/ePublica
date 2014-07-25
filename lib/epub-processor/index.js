
var admZip  = require("adm-zip"),
    xml2js  = require("xml2js"),
    fs      = require("fs"),
    mkdirp  = require("mkdirp"),
    uuid    = require("node-uuid");

//paths and files
var epub_root       = "./epubs",
    metaInf         = "/META-INF"
    containerXML    = "/container.xml",
    signaturesXML   = "signature.xml",
    encryption      = "encryption.xml",
    oebps           = "/OEBPS"

function ePubProcessor(){

}

ePubProcessor.prototype.buildStructure = function(){
    //build container - check current directory to see if any other epXXXX file exists
    var ocf_root = uuid.v1();
    fs.exists(path, function(exists){
        if(!exists){

            //build root container
            mkdirp(epub_root + ocf_root, function(err){
                if(err) {throw err}
                //make META-INF

            });
        }
    });
}

ePubProcessor.prototype.build = function(metadata, path){
    //create boilerplate epubfile
    console.log(path);
}

module.exports = new ePubProcessor();