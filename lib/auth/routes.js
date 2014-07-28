/**
 * Created by Larry Eliemenye on 15/05/14.
 */


module.exports = function(database){
    var db = database;
    return{
        verifier:function(req,res,next){
            db.collection("users").find({
                $and:[
                    {username:req.param("username")},
                    {password:req.param("password")}
            ]}).toArray(function(err, collections){
                if(err) throw err
                if(collections.length !== 0){
                    res.json({
                        error:false,
                        data:{
                            user_id:collections[0]["_id"],
                            username:collections[0]["username"]
                        }
                    })
                }else{
                   res.json({
                       error:true,
                       message:"Ooopss!! Invalid Username or password",
                       data:collections
                   })
                }
            });

        },
        addUser:function(req,res,next){

        }
    }
}
