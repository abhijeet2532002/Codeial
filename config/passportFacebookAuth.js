const passport = require('passport');
const facebookAuth = require('passport-facebook').Strategy;
const crypto = require('crypto');
const User = require('../model/UserSchema');

passport.use(new facebookAuth({
    clientID: '845342887290288',
    clientSecret: 'b9ae738ee6b50ec4e2f0aff33d0e2867',
    callbackURL: "https://localhost:9091/user/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   console.log(user);
    //   return cb(err, user);
    // });
  }
));


passport.serializeUser(function (user, done) {
  return done(null, user);
})

passport.deserializeUser(function (user, done) {
  return done(null, user);
});


module.exports = passport;