/**
 * Created by laggie on 01/05/14.
 */
var index = function(req,res,next){
  console.log("opensesamie");
}
var createUser = function(req,res,next){
  console.log("Got user!");
}

var deleteUser = function(req,res,next){
  console.log("Getting user details")
}

var getUser = function(){
  console.log("fetching user")
}

var updateUser = function(){
  console.log("updaing user details")
}

exports.index = index
exports.createUser = createUser;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;