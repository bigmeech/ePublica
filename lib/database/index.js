
var passportLocalMongoose = require("passport-local-mongoose");

module.exports = function(mongoose){

    //Get Schema and Object ID
    var Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId;

    //Schemas
    var user = new Schema({
        userId      :   {type:Number},
        username    :   {type:String},
        password    :   {type:String},
        lastLogin   :   {type:Date}
    })

    var publication = new Schema({
        _id           :   {type:ObjectId},
        contributors    :   [user],
        title           :   {type:String},
        kwbn            :   {type:String},
        synopsis        :   {type:String},
        isbn            :   {type:String},
        publishedOn     :   {type:Date},
        edition         :   {type:String}
    })

    //Models Hash
    var models = {
        User            :   mongoose.model('User',user),
        Publication     :   mongoose.model('Publication',publication)
    }

    var schemas ={
        user        :user,
        publication :publication
    }

    //plugins
    user.plugin(passportLocalMongoose);

    return{
        getModel:function(name){
            return models[name];
        },
        getObjectId:function(){
            return new mongoose.Types.ObjectId;
        },
        getSchema:function(name){
            return schemas[name];
        }
    }
}

