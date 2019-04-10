const mongoose = require('mongoose')

const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
    GithubStrategy = require('passport-github2').Strategy;

const User = require('../models/user')

module.exports = passport => {

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (user, done) {
        User.findById(user._id, function (err, user) {
            done(null, user);
        });
    });

    passport.use('local-login', new LocalStrategy({
        passReqToCallback: true,
    },
      function(req, username, password, done) {
        console.log(password)
        User.findOne({ username: username }, { password: 1 }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          if (!user.validPassword(password)) { return done(null, false); }

          return done(null, user);
        });
      }
    ));

    passport.use(new GithubStrategy({
        clientID: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URI,
    },
    function(accessToken, refreshToken, profile, cb) {
        newUser = new User ({
            username: profile.username,
            githubId: profile.id,
        })

        User.findOrCreate({ githubId : profile.id }, { username: profile.username }, function(err, user) {
            if (err) {
                console.log(err);
            }
            return cb(null, user)
        })
    }));
}
