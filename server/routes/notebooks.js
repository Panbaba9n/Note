var express = require('express');
var router = express.Router();
var User = require('../models/users');
var authStrategy = require('../config/authStrategy');
var NoteBooks = require('../models/notebooks');

router.use(authStrategy.check);

/* GET notebooks. */
router.post('/', function(req, res, next) {
    var autor = req.decoded.id;
    console.log(autor);

    NoteBooks.find({autor: autor}, function (err, docs) {
        if (err) {return console.error(err);}
        
        // console.log(docs);
        if( docs == [] ){
            res.status(404).json({message:"no data found"});
        } else {
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

        console.log(req.body);

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

    if(req.body.title){
        var title = req.body.title;
        var autor = req.decoded.id;
        var notes = req.body.notes || [];

        console.log(req.body);

        NoteBooks.findOne({ title: title, autor: autor }, function (err, docs) {
            if (err) {return console.error(err);}
            if( !docs ){
                res.status(403).json({message:"Not fount Notebook whith such title."});
            } else {
                notesRemove(notes, autor);
                dataRemove(title, notes, autor);
            }
        });

        function notesRemove(title, notes, autor) {
            console.log('======= Need to make a Remove notes function! =======');
        };

        function dataRemove(title, notes, autor) {
            NoteBooks.findOne({ title: title, autor: autor }).remove(function(cb) {
                res.json({message: "Delete compleated successfully!"});
            });
        };

    } else {
        res.status(403).json({message:"You forgot to send notebook title."});
    }

});

module.exports = router;