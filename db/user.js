'use strict'

const User = require('../models/user');
var Promise = require('bluebird');

exports.saveUser = function (user,done){
  var newUser = new User(user);
   return new Promise(function(resolve, reject){
     // save the user
    newUser.save().then(function(data){
        resolve(data)},
        function(error){
            reject(error)
    });
  });
}

exports.getAllUsers = function(){
  return new Promise(function(resolve,reject){
    User.find().then(function(data){
      resolve(data)
    },
      function(error){
        reject(error)
      });
  });
}

exports.getUserByName = function(name){
  return new Promise(function(resolve,reject){
    User.findOne({name:name}).then(function(data){
      resolve(data)
    },
      function(error){
        reject(error)
      });
  });
}