/**
 * Created by Larry Eliemenye on 15/05/14.
 */


module.exports = function(database){
    var User = database.getModel("User"),
        userSchema = database.getSchema("user");

    console.log("blah");
    return{
        verify:function(username,password,done){
            //console.log("verifyer called");
            User.findOne({username:username},
                function(err, user){
                    if(err) {return done(err)}
                    if(!user){
                        return done(null,false,{message:'Incorrect username'});
                    }
                    if(!user.validatePassword(password)){
                        return done(null,false,{message:'Incorrect Password'})
                    }
                    return done(null,user);
                })
        },
        signup:function(req,res,next){
            User.register(new User({
                username:req.param("username")}),req.param("password"),
         function(err, account){
                if(err.name ==='BadRequestError'){
                    res.json(401,{
                        error:true,
                        message:err.message,
                        data:err
                    })
                }
                if(account){
                    //console.log(account);
                    res.json(account);
                }
            });
        },
        serialiseUser:function () {
            console.log("Serialize User")
            return User;
        },
        deserialiseUser:function () {
            console.log("Desearialise User")
            return User;
        },
        signInWithFacebook:function(){

        }
    }
}
