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
        pubId           :   {type:ObjectId},
        contributors    :   [user],
        title           :   {type:String},
        kwbn            :   {type:String},
        synopis         :   {type:String},
        isbn            :   {type:String},
        publishedOn     :   {type:Date},
        edition         :   {type:Number}
    })

    //Models Hash
    var models = {
        User            :   mongoose.model('User',user),
        Publication     :   mongoose.model('Publication',publication)
    }

    return{
        getModel:function(name){
            return models[name];
        },
        getObjectId:function(){
            return new mongoose.Types.ObjectId
        }
    }
}

