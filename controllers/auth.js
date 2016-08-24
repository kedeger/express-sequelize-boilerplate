//
var express = require('express');
var router = express.Router();
var passport = require('../config/ppConfig');

var db = require('../models');

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.post('/signup', function(req, res) {
  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, created) {
    if(created) {
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created and logged in'
      })(req, res);
    } else {
      req.flash('error','Email already exists');
      res.redirect('/auth/signup');
    }
  }).catch(function(error) {
    req.flash('error', 'an error occurred: ' + error.message);
    res.redirect('/auth/signup');
  });
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid username and/or password',
  successFlash: 'You logged in'
}));

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'Logged out');
  res.redirect('/');
});

router.get('/facebook', passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: 'An error occured, please try again',
  successFlash: 'Logged in with Facebook'
}));

router.get('/soundcloud', passport.authenticate('soundcloud', {
  //scope: ['user']
}));

router.get('/soundcloud/callback',
  passport.authenticate('soundcloud', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: 'An error occured, please try again',
  successFlash: 'Logged in with Soundcloud'
}),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


module.exports = router;
