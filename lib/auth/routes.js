/**
 * Created by Larry Eliemenye on 15/05/14.
 */


module.exports = function(database){
    var User = database.getModel("User"),
        userSchema = database.getSchema("user");

    console.log("blah");
    return{
        verifier:function(req,res,next){
            User.findOne({
                $and:[
                    {username:req.param("username")},
                    {password:req.param("password")}
                ]},
                function(err, user){
                    if(err) throw err
                    if(user){
                        req.session.loggedIn = true
                        res.json(user)
                    }
                    else{
                        res.json({
                            error:true,
                            message:"Ooopss!! Invalid Username or password"
                        })
                    }
                })
        },
        signup:function(req,res,next){
            User.register(new User({
                username:req.param("username")}),req.param("password"),
         function(err, account){
                if(err.name === Errors.BadRequestError) console.log(err);
                if(account){
                    console.log(account);
                    res.json(account);
                }
            });
        },
        serialiseUser:function () {
            return User;
        },
        deserialiseUser:function () {
            return User;
        },
        signInWithFacebook:function(){

        }
    }
}
