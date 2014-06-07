
var mongoose = require("mongoose");
mongoose.connect("https://kawee.cloudant.com/");
var db = mongoose.connection;

//mongodb connections
//--------------------------------------------------

db.on("open",function(){
  //On Open suceed,
  var userSchema = mongoose.Schema({
    username:String,
    password:String,
    email:String
  });

  var authorSchema = mongoose.Schema({
    name:String,
    email:String,
    dateCreated:Date
  });

  var bookSchema = mongoose.Schema({
    title:String,
    synopsis:String,
    price: Number,
    rating:Number
  });
  var UserModel = mongoose.model('user',userSchema);
  var AuthorModel = mongoose.model('author',authorSchema);
  var BookModel = mongoose.model('book',bookSchema);
})

//on DB open error
//----------------------------------------------
db.on("error",function(err){
  console.log("Error Opening mongodb"+err)
});