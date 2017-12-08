var express = require('express');
var router = express.Router();
var User = require('../models/users');

/* GET registration page. */
router.get('/', function(req, res, next) {
  res.json({"registration": "send post"});
});

/* POST registratiom new user. */
router.post('/', function(req, res, next) {

  if(req.body.name && req.body.password){
    console.log(req.body);
    var name = req.body.name;
    var password = req.body.password;
    var admin = req.body.admin || false;


    User.findOne({ 'name': name }, function (err, docs) {
      if (err) {return console.error(err);}
      if( docs ){
        res.status(401).json({message:"Such user already exist! Try another name."});
      } else {
        userCreate(name, password, function(cb) {
          res.json({message: "Registration compleate successfully, now you should login!"});
        });
      }
    });
  } else {
    res.status(401).json({message:"You need to send 'name' and 'password'"});
  }

  function userCreate(name, password, cb) {
    userdetail = { name:name, password:password, admin:admin };
    var user = new User(userdetail);

    user.save(function (err) {
      if (err) {
        cb(err, null)
        return
      }
      console.log('New User: ' + user);
      cb(null, user);
    });
  }

});

module.exports = router;