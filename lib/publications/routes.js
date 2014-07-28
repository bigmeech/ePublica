/**
 * Created by epublica on 29/06/2014.
 */

module.exports = function(db){

    return{
        setPublication:function(req,res,next){
            console.log(req.param("pubId"))
            db.collection('publication').update({pubId:req.param("pubId")},{
                pubId:req.param("pubId"),
                title:req.body.book_title,
                author_name:req.body.author_name
            }, function(err, publication){
                if(err) throw err;
                if(!publication) res.json(404,{error:"specified pubId not found"})
                res.json(publication);
            })
        },
        getPublication:function(req,res,next){
            db.collection('publication').findOne({pubId:req.params.pubId}, function(err,doc){
                if(err) throw err;
                res.json(200, doc);
            });
        },
        deletePublication:function (req,res,next){
            var pubId = req.param("pubId");
            db.collection("publication").remove({pubId:pubId}, function(err,doc){
                if(err) throw error;
                res.json(doc);
            })
        },
        createPublication:function(req,res,next){
            var publication = {
                title:req.body.book_title,
                author_name:req.body.author_name
            }
            db.collection('publication').insert(publication, function(err, doc){
                if(err) throw err
                res.json(doc);
                //db.close();
            });
        }
    }
}