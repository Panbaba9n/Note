var express = require('express');
var router = express.Router();
var authStrategy = require('../controllers/auth.token');
var User = require('../models/users');

router.use(authStrategy.checkToken);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({"test": "lol"});
});

/* POST users listing. */
router.post('/', function(req, res, next) {
    if(req.body.searchstring) {
        var serchstring = new RegExp(req.body.searchstring, "ig");
        console.log(serchstring);
        User.find({name: serchstring}, "name", function (err, docs) {
            if (err) {
                return console.error(err);
            }

            if (docs.length == 0) {
                res.send([]);
            } else {
                res.send(docs);
            }
        });
    } else {
        res.send([{"test": "lol"}, {"test": "po"}, {"test": "po2"}, {"test": "po3"}, {"test": "po4"}, {"test": "po5"}]);
    }
});

module.exports = router;
