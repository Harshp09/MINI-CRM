// backend/config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../models/userModel');

passport.use(new GoogleStrategy({
    clientID: '4888696175-d4i6bosn0m6m3f8ktjtnju2bhiiihsoh.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/auth/google/callback'
},
(accessToken, refreshToken, profile, done) => {
    userModel.findOrCreateUser(profile, (err, user) => {
        return done(err, user);
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    userModel.findById(id, (err, user) => {
        done(err, user);
    });
});
