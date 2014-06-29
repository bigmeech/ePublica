/**
 * Created by epublica on 29/06/2014.
 */

var PublicationsService = function($http){
    this.$http = $http;
}



PublicationsService.prototype.createPub = function(title, isbn, synopsis,price,tags){

    var publication = {
        title:title,
        isbn:isbn,
        synopsis:synopsis,
        price:price,
        tags:tags
    }
    return this.$http({method:'POST',url:'/createPub',data:publication});

}


module.exports = PublicationsService;