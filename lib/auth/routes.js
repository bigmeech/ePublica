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
            console.log(userSchema);
            User.register(new User({
                username:req.param("username"),
                password:req.param("password")
            }), function(err, account){
                if(err) throw err
                if(account){
                    console.log(account);
                    res.json(account);
                }
            });
            /*user.username =
            user.password =
            user.register =
            user.save(function(err,user,affected){
                if(err) throw err
                if(user && affected === 1){
                    res.json(user);
                }else{
                    res.json({
                        error:true,
                        message:"Could not create a new user for some odd reasons"
                    })
                }
            });*/
        },
        serialiseUser:function () {
            return User;
        },
        deserialiseUser:function () {
            return User;
        }
    }
}
