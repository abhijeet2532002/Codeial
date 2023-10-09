const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../model/UserSchema')

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'abhijeet'
};

passport.use(new JwtStrategy(opts, (payload, done) => {
    User.findById(payload._id).then(user => {
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }).catch(err => {
        console.log("something error   ", err);
        return;
    })
}))

module.exports = passport;