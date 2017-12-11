var jwt = require('jsonwebtoken');
var config = require('../config/jwt.config.js');
var User = require('../models/users');


module.exports = {
    checkToken: checkToken,
    makeToken: makeToken
};


// var checkToken = function(req, res, next) {
function checkToken(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, config.jwtSecret, function(err, decoded) {
            if (err) {
                return res.json({ success: false, isAuth: false, message: 'Failed to authenticate token.'  });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            isAuth: false,
            message: 'No token provided.'
        });

    }
}

function makeToken(req, res, next) {

    // find the user
    User.findOne({
        name: req.body.name
    }, function (err, user) {

        if (err) throw err;

        if(!user) {
            res.status(401).json({ success: false, isAuth: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.status(401).json({ success: false, isAuth: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire user since that has the password
                var payload = {
                    admin: user.admin,
                    id: user.id
                };
                // expires in 0.5 hours
                var token = jwt.sign(payload, config.jwtSecret, {
                    expiresIn: config.jwtExpires
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Login completed successfuly!',
                    isAuth: true,
                    token: token
                });
            }

        }
    });

}