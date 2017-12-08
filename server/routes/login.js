var express = require('express');
var router = express.Router();

var UserInfo = require('../models/users');

var auth = require('../controllers/auth.token.js');


/* GET login page. */
router.get('/', function(req, res, next) {
    res.json({ "message": 'Login route' });
});

/* POST login user. */
router.post('/', function(req, res, next) {
	console.log( req.body );
    if(req.body.name && req.body.password){
        var name = req.body.name;
        var password = req.body.password;

        auth.makeToken(req, res, next);

    } else {
        res.status(401).json({message:"You need to send 'name' and 'password'"});
    }
});

module.exports = router;
