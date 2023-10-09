const passport = require('passport')
var GitHubStrategy = require('passport-github2').Strategy;
const User = require('../model/UserSchema');
const crypto = require('crypto');

passport.use(new GitHubStrategy({
    clientID: '0c18b01dfd607e12da82',
    clientSecret: 'f0e18e3d172277488859203ec9e45560fd6b759a',
    callbackURL: "http://localhost:9091/user/auth/github/callback",
    scope: ['user:email'],
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({email: profile.emails[0].value}).then((user) => {     
        console.log(profile);      
        if(user) {
            console.log('userfound callback');
            return done(null,user);
        }
        else {
            User.create({
                email: profile.emails[0].value,
                name: profile.displayName,
                password: crypto.randomBytes(20).toString('hex')
            }).then(data=>{
                console.log(data);
                return done(null,data);
            }).catch(err=>{
                console.log("There is problem with creation of user according google account",err);
                return;
            })
        }
    }).catch(err=>{
        console.log("there  is problem with finding user with google token",err);
            return;
    })
  }
));