var express = require('express');
var router = express.Router();
var userOperation = require('../db/user');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config/config'); // get our config file

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});
router.post('/register', function(req, res) {
    userOperation.saveUser(req.body).then(function(data){
      res.send(data);
    },function(error){
      res.status(206).send(error);
    });
});

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate',function(req, res) {

  // find the user
  userOperation.getUserByName(req.body.name).then(function(user){
    if(!user){
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    }
    else if (user) {
      // check if password matches
      user.verifyPassword(req.body.password, function(err, isMatch) {
        if (err) { return  res.status(500).send(err); }
        if(!isMatch){return res.json({ success: false, message: 'Authentication failed. Wrong password.' });}
         // if user is found and password is right
         // use claims to hide user identity refer link https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens discussions
         var claims = { sub: user._id,
                        iss: 'https://app-jwt.com',
                        permissions: 'identify'
                      }
        // create a token
        var token = jwt.sign(claims,config.secret, {
          expiresIn: "24h", // expires in 24 hours
          algorithm: "HS512"
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      });  
    }
  },function(err){
    res.status(500).send(err)
  })
});

module.exports = router;
