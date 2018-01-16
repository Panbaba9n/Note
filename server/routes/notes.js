var express = require('express');
var router = express.Router();
var authStrategy = require('../controllers/auth.token');
var NoteBooks = require('../models/notebooks');
var Notes = require('../models/notes');
var ObjectId = require('mongodb').ObjectID;

router.use(authStrategy.checkToken);

/* GET notes. */
router.post('/', function(req, res, next) {
    var autor = req.decoded.id;
    var notebook = req.body.notebookid || [];

    Notes.find({notebook:notebook, autor: autor}, function (err, docs) {
        if (err) {return console.error(err);}
        
        if( docs.length == 0 ){
            res.status(404).json({message:"no data found"});
        } else {
            res.json(docs);
        }
    });

});

/* Add note. */
router.post('/add', function(req, res, next) {

    if(req.body.title){
        var title = req.body.title;
        var content = req.body.content || '';
        var autor = req.decoded.id;
        var notebookID = req.body.notebookid || [];

        NoteBooks.findOne({ "_id": ObjectId(notebookID), autor: autor }, function (err, docs) {
            if (err) {return console.error(err);}
            if( docs ){
                dataCreate(title, content, notebookID, autor, function(cb) {
                    res.json({message: "Adding compleate successfully!"});
                });
            } else {
                res.status(403).json({message:"Notebook whith such Id does not exist! Send note in exist notebook."});
                
            }
        });
    } else {
        res.status(403).json({message:"You forgot to send note title."});
    }

    function dataCreate(title, content, notebook, autor, cb) {
        var datadetail = {title:title, content:content, notebook:notebook, autor:autor };
        var dataItem = new Notes(datadetail);

        dataItem.save(function (err) {
            if (err) {
                cb(err, null)
                return
            }
            console.log('New Note: ' + dataItem);
            cb(null, dataItem)
        });

    }

});

/* Update note. */
router.post('/update', function(req, res, next) {

    if(req.body.note._id){
        var notebookId = req.body.notebookid;
        var id = req.body.note._id;
        var title = req.body.note.title;
        var content = req.body.note.content;
        var autor = req.decoded.id;

        Notes.findOne({ "_id": ObjectId(id), autor: autor }, function (err, docs) {
            if (err) {return console.error(err);}
            if( !docs ){
                res.status(403).json({message:"Not fount Notebook whith such title."});
            } else {
                dataUpdate(id, autor);
            }
        });

        function dataUpdate(id, autor) {
            Notes.updateOne({ _id: ObjectId(id), autor: autor }, { $set: {title: title, content: content} }, function(cb) {
                res.json({message: "Upgrade compleated successfully!"});
            });
        };

    } else {
        res.status(403).json({message:"You forgot to send note id or title."});
    }

});

/* Delete note. */
router.post('/del', function(req, res, next) {

    if(req.body.note._id){
        var id = req.body.note._id;
        var autor = req.decoded.id;

        Notes.findOne({ "_id": ObjectId(id), autor: autor }, function (err, docs) {
            if (err) {return console.error(err);}
            if( !docs ){
                res.status(403).json({message:"Not fount Notebook whith such title."});
            } else {
                dataRemove(id, autor);
            }
        });

        function dataRemove(id, autor) {
            Notes.remove({ _id: ObjectId(id), autor: autor }, function(cb) {
                res.json({message: "Delete compleated successfully!"});
            });
        };

    } else {
        res.status(403).json({message:"You forgot to send note id."});
    }

});

module.exports = router;