var pubs = angular.module("publications",[])
pubs.controller("PublicationsController",require("./publicationsController"));
pubs.service("PublicationsService",require("./publicationsService"));
module.exports = pubs;
