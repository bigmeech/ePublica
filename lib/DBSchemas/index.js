
var mongoose = require("mongoose");
mongoose.connect("mongodb://nodejitsu:dc050738e253071035f3a42a07c60ed9@troup.mongohq.com:10036/nodejitsudb9148095261");
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