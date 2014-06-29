/**
 * Created by epublica on 29/06/2014.
 */

var createPub = function(req,res,next){
    res.json({result:"Pub Created!"})
};

var deletePub = function (req,res,next){
    res.json({result:"Pub deleted!"});
}

exports.createPub = createPub;
exports.deletePub = deletePub;