/**
 * Created by epublica on 29/06/2014.
 */

module.exports = function(database){
    var Publication = database.getModel("Publication");
    return{
        setPublication:function(req,res,next){
            var onUpdate = function(err, affected, raw){
                if(err) throw err
                if(raw && affected === 1){
                    res.json({
                        success:true,
                        message:"Publication updated!",
                        data:raw
                    })
                }else{
                    res.json({
                        success:false,
                        message:"Update didnt really go as expected..bruv!"
                    })
                }
            }
            Publication.update({pubId:req.param("pubId")},{
                title       :   req.body.bookTitle,
                author      :   req.body.author,
                kwbn        :   req.body.kwbn,
                synopsis    :   req.body.synopsis,
                isbn        :   req.body.isbn,
                publishedOn :   req.body.publishedOn,
                edition     :   req.body.edition
            }, onUpdate);
            /*db.collection('publication').update({pubId:req.param("pubId")},{
                pubId:req.param("pubId"),
                title:req.body.book_title,
                author_name:req.body.author_name
            }, function(err, publication){
                if(err) throw err;
                if(!publication) res.json(404,{error:"specified pubId not found"})
                res.json(publication);
            })*/
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
            var publication = new Publication(),
                onSave = function(err, publication, affected){
                    if(err) throw err
                    if(publication && affected === 1){
                        res.json({
                            success :true,
                            message :"New Publication Created",
                            data    :publication
                        })
                    }else{
                        res.json({
                            sucess:false,
                            message:"This is Odd, Publication was never created"
                        })
                    }
                }
            publication.pubId           = database.getObjectId();;
            publication.contributors    = []
            publication.title           = req.body.title;
            publication.kwbn            = req.body.kwbn;
            publication.synopsis        = req.body.synopsis;
            publication.isbn            = req.body.isbn;
            publication.publishedOn     = req.body.publishedOn;
            publication.edition         = req.body.edition;
            publication.save(onSave);
            /*var publication = {
                title:req.body.book_title,
                author_name:req.body.author_name
            }
            db.collection('publication').insert(publication, function(err, doc){
                if(err) throw err
                res.json(doc);
                //db.close();
            });*/
        }
    }
}