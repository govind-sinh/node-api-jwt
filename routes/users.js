var express = require('express');
var router = express.Router();
var userOperation = require('../db/user');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config/config'); // get our config file

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/users', function(req, res) {
    userOperation.getAllUsers().then(function(data){
      res.send(data);
    },function(error){
      res.status(500).send(error);
    });
});

module.exports = router;
