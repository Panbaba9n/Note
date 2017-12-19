var express = require('express');
var router = express.Router();
var User = require('../models/users');
var authStrategy = require('../controllers/auth.token');
var NoteBooks = require('../models/notebooks');
var Notes = require('../models/notes');
var ObjectId = require('mongodb').ObjectID;

router.use(authStrategy.checkToken);

/* GET notebooks. */
router.post('/', function(req, res, next) {
    var autor = req.decoded.id;

    NoteBooks.find({autor: autor}, function (err, docs) {
        if (err) {return console.error(err);}
        
        // console.log(docs);
        if( docs == [] ){
            res.status(404).json({message:"no data found"});
        } else {
            // res.status(401).json({message:"no data found"});
            res.json(docs);
        }
    });

});

/* Add notebook. */
router.post('/add', function(req, res, next) {

    if(req.body.title){
        var title = req.body.title;
        var autor = req.decoded.id;
        var notes = req.body.notes || [];

        NoteBooks.findOne({ title: title, autor: autor }, function (err, docs) {
            if (err) {return console.error(err);}
            if( docs ){
                res.status(403).json({message:"Notebook whith such name already exist! Use unic notebook name."});
            } else {
                dataCreate(title, notes, autor, function(cb) {
                    res.json({message: "Adding compleate successfully!"});
                });
            }
        });
    } else {
        res.status(403).json({message:"You forgot to send notebook title."});
    }

    function dataCreate(title, notes, autor, cb) {
        var datadetail = {title:title, notes:notes, autor:autor };
        var dataItem = new NoteBooks(datadetail);

        dataItem.save(function (err) {
            if (err) {
                cb(err, null)
                return
            }
            console.log('New User: ' + dataItem);
            cb(null, dataItem)
        });
    }

});

/* Delete notebook. */
router.post('/del', function(req, res, next) {

    if(req.body.notebook._id){
        var id = req.body.notebook._id;
        var autor = req.decoded.id;
        var notes = req.body.notes || [];

        NoteBooks.findOne({ "_id": ObjectId(id), autor: autor }, function (err, docs) {
            if (err) {return console.error(err);}
            if( !docs ){
                res.status(403).json({message:"Not fount Notebook whith such title."});
            } else {
                notesRemove(id, autor);
                dataRemove(id, notes, autor);
            }
        });

        function notesRemove(id, autor) {
            Notes.findOne({ "notebook": ObjectId(id), autor: autor }, function (err, docs) {
                if (err) {return console.error(err);}
                if( !docs ){
                    console.log('Notes not fouded!');
                } else {
                    notebookNotesRemove(id, autor);
                }
            });

            function notebookNotesRemove(id, autor) {
                Notes.remove({ "notebook": ObjectId(id), autor: autor }, function(cb) {
                    console.log('Delete compleated successfully!');
                });
            };
        };

        function dataRemove(id, notes, autor) {
            NoteBooks.remove({ _id: ObjectId(id), autor: autor }, function(cb) {
                res.json({message: "Delete compleated successfully!"});
            });
        };

    } else {
        res.status(403).json({message:"You forgot to send notebook id."});
    }

});

/* Update notebook. */
router.post('/update', function(req, res, next) {

    if(req.body.notebook._id){
        var id = req.body.notebook._id;
        var title = req.body.notebook.title;
        var autor = req.decoded.id;
        var notes = req.body.notes || [];

        NoteBooks.findOne({ "_id": ObjectId(id), autor: autor }, function (err, docs) {
            if (err) {return console.error(err);}
            if( !docs ){
                res.status(403).json({message:"Not fount Notebook whith such title."});
            } else {
                dataUpdate(id, notes, autor);
            }
        });

        function dataUpdate(id, notes, autor) {
            NoteBooks.updateOne({ _id: ObjectId(id), autor: autor }, { $set: {title: title} }, function(cb) {
                res.json({message: "Upgrade compleated successfully!"});
            });
        };

    } else {
        res.status(403).json({message:"You forgot to send notebook id or title."});
    }

});

module.exports = router;