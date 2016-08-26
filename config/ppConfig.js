var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var SoundCloudStrategy = require('passport-soundcloud').Strategy;
var db = require('../models');


passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.user.findById(id).then(function(user) {
    cb(null, user);
  }).catch(cb);
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, cb) {
  db.user.find({
    where: { email: email }
  }).then(function(user) {
    if(!user || !user.validPassword(password)) {
      cb(null, false);
    } else {
      cb(null, user);
    }
  }).catch(cb);
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.BASE_URL + '/auth/facebook/callback',
  profileFields: ['id', 'email', 'displayName'],
  enableProof: true
},

function(accessToken, refreshToken, profile, cb) {
  var email = profile.emails ? profile.emails[0].value : null;

  db.user.find({
    where: { email: email }
  }).then(function(existingUser) {
    if(existingUser && email) {
      existingUser.update({
        facebook_Id: profile.id,
        facebookToken: accessToken
      }).then(function(updatedUser) {
        cb(null, updatedUser);
      }).catch(cb);
    } else {
      db.user.findOrCreate({
        where: { facebook_Id: profile.id },
        defaults: {
          facebookToken: accessToken,
          name: profile.displayName,
          email: email
        }
      }).spread(function(user, created) {
        if(created) {
          return cb(null, user);
        } else {
          user.facebookToken = accessToken;
          user.save().then(function() {
            cb(null, user);
          }).catch(cb);
        }
      }).catch(cb);
    }
  }).catch(cb);
}));

passport.use(new SoundCloudStrategy({
    clientID: process.env.SOUNDCLOUD_CLIENT_ID,
    clientSecret: process.env.SOUNDCLOUD_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/soundcloud/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    //User.findOrCreate({ soundcloudId: profile.id }, function (err, user) {
     // return done(err, user);
   // });
   console.log(profile);
   var username = profile.username;

  db.user.find({
    where: { name: username }
  }).then(function(existingUser) {
    if(existingUser && username) {
      existingUser.update({
        soundcloud_Id: profile.id,
        soundcloudToken: accessToken
      }).then(function(updatedUser) {
        done(null, updatedUser);
      }).catch(done);
    } else {
      db.user.findOrCreate({
        where: { soundcloud_Id: profile.id.toString() },
        defaults: {
          soundcloudToken: accessToken,
          name: username,
        }
      }).spread(function(user, created) {
        if(created) {
          return done(null, user);
        } else {
          user.soundcloudToken = accessToken;
          user.save().then(function() {
            done(null, user);
          }).catch(done);
        }
      }).catch(done);
    }
  }).catch(done);

  }));

module.exports = passport;
