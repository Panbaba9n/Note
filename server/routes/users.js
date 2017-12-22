var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({"test": "lol"});
});

/* POST users listing. */
router.post('/', function(req, res, next) {
  res.send([{"test": "lol"}, {"test": "po"}]);
});

module.exports = router;
