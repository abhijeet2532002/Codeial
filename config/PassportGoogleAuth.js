const passport = require('passport');
const googleAuth = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../model/UserSchema');

passport.use(new googleAuth({
    clientID: '691149514357-ibn7lnbtk9gais6n0l5427jbn4li2rlb.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:9091/user/auth/google/callback'
}, 

function(accessToken,refreshToken,profile,done) {
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
}));

module.exports = passport;