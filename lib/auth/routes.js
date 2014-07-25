/**
 * Created by Larry Eliemenye on 15/05/14.
 */


module.exports = function(){
    return{
        verifier:function(email, password,done){
            console.log("authenticating...");
            return done(null, {name:"me"})
        }
    }
}
