const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

//Register
router.post('/register', (req, res) => {
  var newUser = new User({
    name : req.body.name,
    email : req.body.email,
    username : req.body.username,
    password : req.body.password
  });
  User.addUser(newUser, (err, user) => {
    if(err) {
      res.json({'success' : false, msg : 'Failed to register user'});
    } else {
      res.json({'success' : true, msg : 'User registerd'});
    }
  });
});

//Authentication
router.post('/authentication', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.josn({'success':false, 'msg':'user not found'});
    }
    User.comparePassword(password, user.password, (err, isMatched) => {
      if(err) throw err;
      if(isMatched) {
        const token = jwt.sign(user, config.secret, {
          expiresIn : 604800
        });
        return res.json({success:true, token:'JWT '+token,
        user: {
          id:user._id,
          name:user.name,
          username:user.username,
          email:user.email
        }});
      } else {
        return res.json({success : false, msg :'wrong password'});
      }
    });
  });
});

//Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user : req.user});
});

module.exports = router;
