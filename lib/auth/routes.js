/**
 * Created by JaneCockblocker on 15/05/14.
 */

exports.verifier =  function(email,password,done){
  console.log("authenticating...");
  return done(null, {name:"me"})
};