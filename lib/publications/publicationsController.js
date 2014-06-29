/**
 * Created by Larry Eliemenye on 30/05/2014.
 */
var pubsController = function($scope, PublicationsService){
    $scope.createPub = function(){
        PublicationsService.createPub({});
    }
}

module.exports = pubsController;